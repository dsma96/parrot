import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

// Define the custom log format
const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

// Configure the daily rotating file transport
const fileLog = new DailyRotateFile({
    filename: 'logs/parrot-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat
    )
});

// Create the logger instance
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: combine(
                colorize(), // Handle colors within the format pipeline
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                logFormat,
            ),
            handleExceptions: true,
        }),
        fileLog
    ],
    exitOnError: false,
});

export default logger;