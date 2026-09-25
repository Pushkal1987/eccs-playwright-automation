import { Browser, BrowserContext, Page } from '@playwright/test';
import { PageObjectsManager } from '../managers/PageObjectsManager';
import { users, UserRole } from '../config/users';
import { HomePage } from '../pages/HomePage';
import { Logger } from '../utils/LoggerUtils';

import fs from 'fs';
import path from 'path';

const authDirectory = path.resolve('auth');
export const AUTH_TIMEOUT = 5 * 60 * 1000;

export function getStorageStatePath(role: UserRole): string {
    return path.join(authDirectory, `${role.toLowerCase()}.json`);
}

export async function authenticateUser(
    browser: Browser,
    role: UserRole): Promise<string> {

    Logger.info('========== AUTHENTICATION START ==========');

    const storagePath = getStorageStatePath(role);
    Logger.debug(`Auth file path   : ${storagePath}`);

    const credentials = users[role];
    Logger.info(`Role             : ${role}`);

    fs.mkdirSync(authDirectory, { recursive: true });
    Logger.debug(`Auth directory   : ${authDirectory}`);

    const context: BrowserContext = await browser.newContext();
    Logger.debug(`Browser context created for role: ${role}`);

    const page: Page = await context.newPage();
    Logger.debug(`Browser page created for role: ${role}`);

    const pomObj = new PageObjectsManager(page);
    Logger.debug('PageObjectsManager created.');

    const loginPageObj = pomObj.getLoginPage();
    Logger.debug('LoginPage object created.');

    try {
        Logger.step(`Opening ECCS login page for ${role}`);
        await page.goto('/eccs');

        Logger.info(`Login page opened for ${role}`);

        Logger.step(`Submitting login credentials for ${role}`);
        await loginPageObj.login(
            credentials.username,
            credentials.password
        );

        Logger.info(`Login submitted for ${role}`);

        Logger.info(`Waiting for OTP validation (timeout: ${AUTH_TIMEOUT / 60000} minutes)`);

        //const homePage = new HomePage(page);
        const homePageObj = pomObj.getHomePage();
        Logger.debug('HomePage object created.');
        Logger.step(`Waiting for ${role} home page after OTP verification`);

        await homePageObj.waitForHomeReady(AUTH_TIMEOUT);
        Logger.success(`${role} authentication and OTP verification completed successfully.`);

        Logger.step(`Saving storage state for ${role}`);
        await context.storageState({ path: storagePath });
        Logger.info(`Storage state saved successfully: ${storagePath}`);

        Logger.info('========== AUTHENTICATION COMPLETED ==========');
        return storagePath;

    } catch (error) {

        Logger.error(`Authentication failed for role: ${role}`);

        Logger.error(`Authentication error: ${error instanceof Error ? error.message : String(error)}`);

        throw error;

    } finally {

        Logger.debug(`Closing browser context for role: ${role}`);
        await context.close();

        Logger.debug(`Browser context closed for role: ${role}`);

        Logger.info('========== AUTHENTICATION END ==========');
    }
}

