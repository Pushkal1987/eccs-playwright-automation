import winston from "winston"; 
import Transport from "winston-transport"; 
// ======================================================  
// Custom Log Levels  
// ======================================================  
const customLevels = { 
    levels: 
    { 
        error: 0, 
        warn: 1, 
        success: 2, 
        info: 3, 
        step: 4, 
        test: 5, 
        debug: 6, 
    }, 
}; 
 
// ======================================================  
// Custom Terminal Transport  
// ======================================================  
 
class TerminalTransport extends Transport { 
    constructor() { 
        super(); 
    } 
 
    log(info: any, callback: () => void): void { 
        const timestamp = new Date() 
            .toLocaleString("en-IN", { 
                year: "numeric", 
                month: "2-digit",  
                day: "2-digit", 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit", 
                hour12: false, 
            }) 
            .replace(",", ""); 
 
        const colors: Record<string, string> = { 
            ERROR: "\x1b[31m", // Red  
            WARN: "\x1b[33m", // Yellow  
            SUCCESS: "\x1b[32m", // Green  
            INFO: "\x1b[34m", // Blue  
            STEP: "\x1b[35m", // Magenta  
            TEST: "\x1b[36m", // Cyan  
            DEBUG: "\x1b[90m", // Gray  
        }; 
 
        const reset = "\x1b[0m"; 
 
        const level = info.level.toUpperCase(); 
 
        const color = colors[level] ?? reset; 
 
        // Color only the log level  
 
        const message = 
            `${timestamp} ${color}[${level}]${reset} ${info.message}`; 
 
        process.stdout.write(message + "\n"); 
 
        callback(); 
    } 
} 
 
// ======================================================  
// File Log Format  
// ======================================================  
 
const fileFormat = winston.format.combine( 
    winston.format.timestamp({ 
        format: "YYYY-MM-DD HH:mm:ss", 
    }), 
 
    winston.format.printf(({ timestamp, level, message }) => { 
        return `${timestamp} [${level.toUpperCase()}] ${message}`; 
    }) 
); 
 
// ======================================================  
// Logger  
// ======================================================  
 
const logger = winston.createLogger({ 
    levels: customLevels.levels, 
 
    // debug = lowest priority, so all custom levels are logged  
    level: "debug", 
 
    transports: [ 
        // ==================================================  
        // 1. Terminal / Console  
        // ==================================================  
 
        new TerminalTransport(), 
 
        // ==================================================  
        // 2. Framework Log  
        // Clears previous log on every test run  
        // ==================================================  
 
        new winston.transports.File({ 
            filename: "src/logs/framework.log",  
            format: fileFormat, 
        }), 
 
        // ==================================================  
        // 3. Combined Log  
        // Keeps all logs  
        // ==================================================  
 
        new winston.transports.File({ 
            filename: "src/logs/combined.log", 
            format: fileFormat, 
        }), 
 
        // ==================================================  
        // 4. Error Log  
        // Only ERROR logs  
        // ==================================================  
 
        new winston.transports.File({ 
            filename: "src/logs/error.log", 
            level: "error", 
            format: fileFormat, 
        }), 
    ], 
}); 
 
// ======================================================  
// Logger Utility Class  
// ======================================================  
 
export class Logger { 
 
    static info(message: string): void { 
        logger.log("info", message); 
    } 
 
    static warn(message: string): void { 
        logger.log("warn", message); 
    } 
 
    static error(message: string): void { 
        logger.log("error", message); 
    } 
 
    static debug(message: string): void { 
        logger.log("debug", message); 
    } 
 
    static success(message: string): void { 
        logger.log("success", message); 
    } 
 
    static step(message: string): void { 
        logger.log("step", message); 
    } 
 
    static test(message: string): void { 
        logger.log("test", message); 
    } 
} 
 
export default Logger;