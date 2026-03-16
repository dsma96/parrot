import cron from 'node-cron';
import puppeteer, { Browser, Page, BrowserContext } from 'puppeteer';
import logger from './src/logger';
import { DaumService } from './src/daumService';
import { configs } from './conf/conf';

const WIDTH = 1900;
const HEIGHT = 1200;
const RANDOM_DELAY = 25;

// --- GLOBAL STATE ---
const jobQueue: string[] = [];
let isProcessing = false;
let browser: Browser | null = null; // Browser instance is now managed globally
const jobRetryCounts = new Map<string, number>(); // To track failures
const MAX_RETRIES = 3; // Set the maximum number of retries for a job

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getBrowser(): Promise<Browser> {
    // If we have a browser and it's still connected, we're good.
    if (browser && browser.isConnected()) {
        return browser;
    }

    logger.info('Browser connection lost or not initialized. Launching a new instance...');

    // If a browser instance exists, it's dead. Try to close it gracefully.
    if (browser) {
        await browser.close().catch(e => logger.error(`Error closing dead browser: ${e.message}`));
    }

    // Launch a new browser instance with all the required arguments.
    browser = await puppeteer.launch({
        headless: false, // Set to true for production
        args: [
            '--unsafely-treat-insecure-origin-as-secure=https://m.cafe.daum.net',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-blink-features=AutomationControlled',
            '--start-maximized',
            '--no-zygote',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    // Listen for a disconnect event to proactively clear the dead instance.
    browser.on('disconnected', () => {
        logger.warn('Browser instance disconnected.');
        browser = null; // Nullify the browser variable so getBrowser knows to relaunch.
    });

    logger.info('New browser instance launched successfully.');
    return browser;
}


/**
 * Adds a job's config key to the queue.
 */
async function enqueueJob(configKey: string, force:boolean=false) {
    const config = configs[configKey];
    if (!config) {
        logger.warn(`[Queue] Attempted to enqueue an invalid job key: ${configKey}`);
        return;
    }
    if( !force ) {
        // Calculate random delay in milliseconds
        // Math.random() returns 0 to 1 (exclusive of 1)
        const delayMs = Math.floor(Math.random() * RANDOM_DELAY * 60 * 1000);
        const executeTime = new Date(Date.now() + delayMs);

        logger.info(`[Queue] Added task: "${config.description}". Will execute around ${executeTime.toLocaleString()}. Pending: ${jobQueue.length + 1}`);


        // Wait before proceeding
        await sleep(delayMs);
    }
    jobQueue.push(configKey);
}

/**
 * Processes one job from the queue if not already processing.
 * This function is designed to be called repeatedly by an interval.
 */
async function processQueue() { // No longer needs browser passed in
    // If a job is already running, or the queue is empty, do nothing on this tick.
    if (isProcessing || jobQueue.length === 0) {
        return;
    }

    isProcessing = true;
    const configKey = jobQueue.shift();

    if (!configKey) {
        isProcessing = false;
        return;
    }

    const config = configs[configKey];
    logger.debug(`[Queue] Processing: "${config.description}". Remaining: ${jobQueue.length}`);

    try {
        // Get a healthy browser instance before running the job.
        const currentBrowser = await getBrowser();
        await runJob(currentBrowser, configKey);

        // If the job was successful, reset its retry count.
        if (jobRetryCounts.has(configKey)) {
            logger.debug(`[Queue] Job ${configKey} succeeded. Resetting retry count.`);
            jobRetryCounts.delete(configKey);
        }
    } catch (err: any) {
        logger.error(`[Queue] A critical error occurred in runJob for ${configKey}: ${err.stack || err}`);

        // --- RETRY LOGIC ---
        const currentRetries = jobRetryCounts.get(configKey) || 0;

        if (currentRetries < MAX_RETRIES) {
            const newRetryCount = currentRetries + 1;
            jobRetryCounts.set(configKey, newRetryCount);

            logger.warn(`[Queue] Re-queueing job ${configKey}. Attempt ${newRetryCount}/${MAX_RETRIES}.`);
            await sleep(10000 * currentRetries); // Wait a bit before re-queueing
            jobQueue.push(configKey);
        } else {
            logger.error(`[Queue] FATAL: Job ${configKey} failed after ${MAX_RETRIES} retries. Discarding job.`);
            // Reset the count for future runs of this job if it's scheduled again
            jobRetryCounts.delete(configKey);
        }

    } finally {
        isProcessing = false;
        logger.info(`[Queue] Finished: "${config.description}".`);

        if (jobQueue.length === 0) {
            logger.debug("[Queue] All tasks complete. Processor is idle.");
        }
    }
}

/**
 * Executes a single, self-contained automation job.
 * (This function remains unchanged)
 */
async function runJob(browser: Browser, configKey: string) {
    const config = configs[configKey];
    if (!config) {
        logger.error(`[${configKey}] Can't find config. Skipping.`);
        return;
    }



    let context: BrowserContext | null = null;

    try {
        logger.info(`[${config.description}] Starting execution...`);

        context = await browser.createBrowserContext();
        await context.overridePermissions("https://m.cafe.daum.net", ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);

        const page = await context.newPage();
        await page.setViewport({ width: WIDTH, height: HEIGHT });
        page.setDefaultNavigationTimeout(0);

        page.on('dialog', async (dialog) => {
            logger.info(`[${config.description}] Dialog message: ${dialog.message()}`);
            await (dialog.type() === 'confirm' ? dialog.accept() : dialog.dismiss());
        });

        const service = new DaumService(page, configKey);
        await service.login(config.user, config.pwd);
        await service.writeBoardArticle(
            config.debug ? config.debug_board : config.board,
            config.title,
            config.contents,
            !config.debug
        );
        await service.saveSession();
        logger.debug(`[${config.description}] Execution Successful.`);

    } catch (error: any) {
        logger.error(`[${config.description}] FATAL ERROR: ${error.message}`);
        // We throw the error so the queue processor's catch block can see it.
        throw error;
    } finally {
        if (context) {
            try {
                await context.close();
                logger.debug(`[${config.description}] Context closed.`);
            } catch (e: any) {
                logger.error(`[${config.description}] Error closing context: ${e.message}`);
            }
        }
    }
}

/**
 * Main application entry point.
 */
(async function main() {
    logger.info("--- Parrot Poster Initializing (Interval Queue Mode) ---");

    // Graceful shutdown
    process.on('SIGINT', async () => {
        logger.info("SIGINT received. Closing browser...");
        if (browser) { // Check if a browser instance exists before closing
            await browser.close();
        }
        process.exit(0);
    });

    // --- Start the Queue Processor Heartbeat ---
    const QUEUE_INTERVAL_MS = 5000; // Check for new jobs every 5 seconds
    // The processor no longer needs the browser instance passed to it.
    setInterval(processQueue, QUEUE_INTERVAL_MS);
    logger.info(`Queue processor started with a ${QUEUE_INTERVAL_MS / 1000} second interval.`);

    const specificJobKey = process.argv[2];

    if (specificJobKey) {
        // --- SINGLE JOB MODE ---
        const config = configs[specificJobKey];
        if (!config) {
            logger.error(`Can't find config for key: "${specificJobKey}". Exiting.`);
            process.exit(1);
        }

        logger.info(`Running in SINGLE-JOB mode for: "${config.description}"`);
        enqueueJob(specificJobKey,true);

    } else {
        // --- MULTI-JOB MODE ---
        logger.info("Running in MULTI-JOB mode. Scheduling all jobs...");

        for (const configKey in configs) {
            const config = configs[configKey];
            if( !config.disabled) {
                if (config.startNow ) {
                    enqueueJob(configKey);
                }

                const schedules = Array.isArray(config.cron) ? config.cron : [config.cron];

                schedules.forEach((scheduleExpression) => {

                    cron.schedule(scheduleExpression, () => {
                        logger.info(`[Cron] Triggered for ${config.description}`);
                        enqueueJob(configKey);
                    });
                    logger.info(` -> Scheduled: "${config.description}" | ${scheduleExpression}`);
                });
            }
        }
        logger.debug("--- Scheduler Active. Waiting for jobs... ---");
    }
})();