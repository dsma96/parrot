import { Page } from 'puppeteer';
import path from "path";
import fs from 'fs';
import logger from './logger';
import { ArticleContent } from './types';

const SESSION_DIR = path.join(__dirname, '../sessions');
const SELECTORS = {
    LOGIN_KAKAO_BTN: '.btn-common.login__container--btn-kakao',
    LOGIN_ID: '#loginId--1',
    LOGIN_PW: '#password--2',
    LOGIN_SUBMIT: '.btn_g.highlight.submit',
    WRITE_BTN: '.link_btns.write_cafe_btn',
    TITLE_INPUT: '#article-subject',
    EDITOR_IFRAME: '#keditorContainer_ifr',
    EDITOR_BODY: '#tinymce',
    PUBLISH_BTN: 'span.tinymce-mobile-toolbar-group-item.tinymce-mobile-toolbar-button.tinymce-mobile-icon-mobilePublish.tinymce-mobile-icon'
};


export class DaumService {
    // Service is now stateless regarding the Browser, it only holds the Page
    constructor(private page: Page, private configKey: string) {
        if (!fs.existsSync(SESSION_DIR)) {
            fs.mkdirSync(SESSION_DIR);
        }
    }

    public async login(user: string, pwd: string): Promise<void> {
        // Check if session exists
        const sessionLoaded = await this.loadSession();
        if (sessionLoaded) {
            try {
                // Verify session validity by checking for a logged-in element
                this.sleep(1);
                logger.info(`Session for ${this.configKey} is valid. Skipping login.`);
                return;
            } catch (e: any) {
                logger.error(e.stack || e);
                logger.warn(`Session for ${this.configKey} is expired or invalid. Proceeding with login.`);
                await this.clearSession();
            }
        }

        logger.info(`No session found for ${this.configKey}. Performing new login.`);
        const loginUrl = "https://logins.daum.net/accounts/oauth/login.do?url=https%3A%2F%2Fcafe.daum.net%2F_c21_%2Fbbs_list%3Fgrpid%3D7rX%26fldid%3D_rec";
        await this.page.goto(loginUrl);

        await this.page.waitForSelector(SELECTORS.LOGIN_SUBMIT, { timeout: 15000 });
        await this.page.type(SELECTORS.LOGIN_ID, user, { delay: 100 });
        await this.page.type(SELECTORS.LOGIN_PW, pwd, { delay: 100 });

        await this.page.click(SELECTORS.LOGIN_SUBMIT);
        await this.page.waitForNavigation();
        logger.info(`Login successful for ${user}`);
    }

    public async writeBoardArticle(url: string, title: string, contents: ArticleContent[], checkDuplicate = true): Promise<void> {
        // Ensure session context is loaded/refreshed just before writing
        await this.loadSession();

        logger.debug(`trying to write article ${url} ${title}`);
        await this.page.goto(url);

        try {
            await this.page.waitForSelector(SELECTORS.WRITE_BTN, { timeout: 5000 });
        } catch (e) {
            logger.warn(`Write button not found. Session might be expired for ${this.configKey}.`);
            await this.clearSession();
            throw new Error("Session expired or invalid page.");
        }

        if (checkDuplicate) {
            const alreadyExist = await this.page.evaluate((t) => document.body.innerText.includes(t), title);
            if (alreadyExist) {
                logger.error(`${title} already exists! Skipping.`);
                return;
            }
        }

        await this.page.click(SELECTORS.WRITE_BTN);

        // --- Verification and Retry Logic for Title Input ---
        const maxRetries = 100;
        let isTitleSetCorrectly = false;
        await this.page.waitForSelector(SELECTORS.TITLE_INPUT);

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            logger.info(`[Title] Attempt ${attempt} to set title...`);

            await this.page.focus(SELECTORS.TITLE_INPUT);
            await this.sleep(1);
            await this.page.type(SELECTORS.TITLE_INPUT, title);
            // Give the page a moment to process the input
            await this.sleep(1);

            // Get the actual value from the input field in the browser
            const actualValue = await this.page.evaluate(() => {
                const input = document.querySelector('#article-subject') as HTMLInputElement;
                return input ? input.value : '';
            });
            await this.sleep(1);

            // Check if the value was set correctly
            if (actualValue === title) {
                logger.info('[Title] Verification successful.');
                isTitleSetCorrectly = true;
                break; // Exit the loop on success
            } else {
                logger.warn(`[Title] Verification failed on attempt ${attempt}.`);
                logger.warn(`> Expected: "${title}"`);
                logger.warn(`> Got:      "${actualValue}"`);

                // If not the last attempt, clear the field and prepare to retry
                if (attempt < maxRetries) {
                    logger.info('[Title] Clearing field for retry...');
                    await this.page.evaluate(() => {
                        document.execCommand('selectAll'); // Select all text
                        document.execCommand('delete');    // Erase the selected text
                    });
                }
            }
        }

        // If all retries failed, throw an error to stop the job
        if (!isTitleSetCorrectly) {
            throw new Error(`Failed to set article title correctly after ${maxRetries} attempts.`);
        }

        await this.sleep(5);

        const iframeElement = await this.page.waitForSelector(SELECTORS.EDITOR_IFRAME);
        const iframe = await iframeElement!.contentFrame();
        if (!iframe) throw new Error("Could not find editor iframe.");

        await iframe.waitForSelector(SELECTORS.EDITOR_BODY);
        await iframe.click(SELECTORS.EDITOR_BODY);
        await iframe.focus(SELECTORS.EDITOR_BODY);
        await iframe.evaluate(() => {
            document.execCommand('selectAll'); // Select all text
            document.execCommand('delete');    // Erase the selected text
        });

        // Loop through contents and inject HTML using the specific structure from the original code
        for (const content of contents) {
            switch (content.type) {
                case 'TEXT':
                    await iframe.evaluate((selector: string, text: string) => {
                        const textArea = document.querySelector(selector);
                        if (!textArea) return;
                        const figure = document.createElement('figure');
                        figure.setAttribute('id', 'code_1748486100176');
                        figure.setAttribute('contenteditable', 'false');
                        // figure.setAttribute('data-source', 'ke-figure'); // Overwritten by next line in original code
                        figure.setAttribute('data-source', text);
                        figure.setAttribute('data-ke-type', 'html');
                        textArea.appendChild(figure);
                    }, SELECTORS.EDITOR_BODY, '<p style="text-align:left;font-size:medium">' + content.data.replace(/\n/g, '<br>') + '</p>');
                    break;

                case 'LINK':
                    await iframe.evaluate((selector: string, url: string, text: string) => {
                        const textArea = document.querySelector(selector);
                        if (!textArea) return;
                        const figure = document.createElement('figure');
                        figure.setAttribute('id', 'code_1748486100176');
                        figure.setAttribute('contenteditable', 'false');
                        // figure.setAttribute('data-source', 'ke-figure');
                        figure.setAttribute('data-source',
                            `<p style="text-align:left;font-size:medium"><a href=${url} target=_top class=ke-link>${text}</a></p>`)
                        figure.setAttribute('data-ke-type', 'html');
                        textArea.appendChild(figure);
                    }, SELECTORS.EDITOR_BODY, content.data.url, content.data.text);
                    break;

                case 'IMAGE_LINK':
                    await iframe.evaluate((selector: string, url: string, src: string) => {
                        const textArea = document.querySelector(selector);
                        if (!textArea) return;
                        const figure = document.createElement('figure');
                        figure.setAttribute('id', 'code_1748486100176');
                        figure.setAttribute('contenteditable', 'false');
                        // figure.setAttribute('data-source', 'ke-figure');
                        figure.setAttribute('data-source',
                            `<p style="text-align:left;font-size:medium"><a href=${url} target=_top class=ke-link>` +
                            `<img src=${src} ` +
                            `data-img-src=${src} ` +
                            "data-origin-width=500 data-origin-height=495 tabindex=0>" +
                            "</a></p>")
                        figure.setAttribute('data-ke-type', 'html');
                        textArea.appendChild(figure);
                    }, SELECTORS.EDITOR_BODY, content.data.url, content.data.src);
                    break;

                case 'IMAGE':
                    await iframe.evaluate((selector: string, src: string) => {
                        const textArea = document.querySelector(selector);
                        if (!textArea) return;
                        const figure = document.createElement('figure');
                        figure.setAttribute('id', 'code_1748486100176');
                        figure.setAttribute('contenteditable', 'false');
                        // figure.setAttribute('data-source', 'ke-figure');
                        figure.setAttribute('data-source',
                            `<p style="text-align:left;font-size:medium"><img src=${src} ` +
                            `data-img-src=${src}` +
                            "data-origin-width=500 data-origin-height=495 tabindex=0></p>");
                        figure.setAttribute('data-ke-type', 'html');
                        textArea.appendChild(figure);
                    }, SELECTORS.EDITOR_BODY, content.data.src);
                    break;

                case 'KAKAO_OPEN_CHAT':
                    await iframe.evaluate((selector: string, url: string, text: string) => {
                        const textArea = document.querySelector(selector);
                        if (!textArea) return;
                        const figure = document.createElement('figure');
                        figure.setAttribute('id', 'code_1748486100176');
                        figure.setAttribute('contenteditable', 'false');

                        figure.setAttribute('data-source',
                            ` <div class="figure-open" contenteditable="false" data-ke-type="opengraph" data-ke-align="alignCenter" data-og-type="website"` +
                            ` data-og-title="${text}" data-og-description=" " data-og-host="open.kakao.com" style="text-align:left;font-size:medium" ` +
                            ` data-og-source-url="${url}" data-og-url="${url}" data-og-image="http://scrap.kakaocdn.net/dn/t9VsY/bl4NAcu8Hj5/05VYpQo4fu5fDpAnNxEW11/kakaolink40_original.png?width=800&height=400" > ` +
                            `<a href="${url}" target="_blank" data-source-url="${url}" >` +
                            '<div class="og-image">' +
                            '<img class="thumb_img" src="http://scrap.kakaocdn.net/dn/t9VsY/bl4NAcu8Hj5/05VYpQo4fu5fDpAnNxEW11/kakaolink40_original.png?width=800&height=400" alt="" xxxxonerror="this.src="//img1.kakaocdn.net/thumb/C200x200/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fcafe_image%2Fcafe_meta_image_190529.png"" tabindex="0">' +
                            '</div><div class="og-text">' +
                            `<p class="og-title" tabindex="0">${text}</p><p class="og-desc" tabindex="0">` +
                            '</p><p class="og-host" tabindex="0">open.kakao.com</p></div></a></div>')

                        figure.setAttribute('data-ke-type', 'html');
                        textArea.appendChild(figure);
                    }, SELECTORS.EDITOR_BODY, content.data.url, content.data.text);
                    break;
            }
        }

        await iframe.click(SELECTORS.EDITOR_BODY);
        await this.sleep(3);
        await this.page.waitForSelector(SELECTORS.PUBLISH_BTN);
        await this.page.click(SELECTORS.PUBLISH_BTN);
        await this.sleep(7);
        logger.debug(`Complete: ${url} ${title}`);
    }

    public async saveSession(): Promise<void> {
        const cookies = await this.page.cookies();
        const sessionFilePath = path.join(SESSION_DIR, `${this.configKey}.json`);
        fs.writeFileSync(sessionFilePath, JSON.stringify({ cookies }, null, 2));
        logger.info(`Session saved for ${this.configKey}`);
    }

    public async clearSession(): Promise<void> {
        const sessionFilePath = path.join(SESSION_DIR, `${this.configKey}.json`);
        if (fs.existsSync(sessionFilePath)) {
            fs.unlinkSync(sessionFilePath);
            logger.info(`Session cleared for ${this.configKey}`);
        }
    }

    private async loadSession(): Promise<boolean> {
        const sessionFilePath = path.join(SESSION_DIR, `${this.configKey}.json`);
        if (fs.existsSync(sessionFilePath)) {
            try {
                const sessionData = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
                if (sessionData.cookies) {
                    await this.page.setCookie(...sessionData.cookies);
                    return true;
                }
            } catch (e) {
                logger.error(`Failed to load or parse session file: ${e}`);
                return false;
            }
        }
        return false;
    }

    private sleep(seconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
}