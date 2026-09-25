import { BrowserContext, test as base } from '@playwright/test';
import fs from 'node:fs';
import { authenticateUser, getStorageStatePath } from '../utils/authHelper';
import { PageObjectsManager } from '../managers/PageObjectsManager';
import { HomePage } from '../pages/HomePage';
import { UserRole } from '../config/users';
import { Logger } from '../utils/LoggerUtils';

type UserLogin = (role: UserRole) => Promise<PageObjectsManager>;

type AuthFixtures = {
    userLogin: UserLogin;
};

export const test = base.extend<AuthFixtures>({
    userLogin: async ({ browser }, use, testInfo) => {
        testInfo.setTimeout(Math.max(testInfo.timeout, 5 * 60 * 1000));

        Logger.info('========== USER LOGIN FIXTURE START ==========');
        Logger.debug(`Test: ${testInfo.title}`);
        Logger.debug(`Timeout: ${testInfo.timeout} ms`);

        const contexts: BrowserContext[] = [];

        const userLogin: UserLogin = async (role) => {

            Logger.info(`========== AUTH REQUEST: ${role} ==========`);
            const storagePath = getStorageStatePath(role);
            Logger.debug(`Checking saved session: ${storagePath}`);

            // Step 1: Check whether saved authentication exists

            if (!fs.existsSync(storagePath)) {

                Logger.info(`[${role}] No saved session found. Authentication required.`);
                await authenticateUser(browser, role);
                Logger.success(`[${role}] New authentication completed.`);
            } else {
                Logger.info(`[${role}] Saved session found. Using existing authentication.`);
            }

            // Step 2: Create browser context using saved session

            Logger.debug(`[${role}] Creating browser context using storage state.`);

            let context = await browser.newContext({ storageState: storagePath });
            contexts.push(context);

            Logger.debug(`[${role}] Browser context created.`);

            // Step 3: Create page and PageObjectsManager

            const page = await context.newPage();
            Logger.debug(`[${role}] Browser page created.`);

            let pomObj = new PageObjectsManager(page);
            Logger.debug(`[${role}] PageObjectsManager created.`);

            const homePage = pomObj.getHomePage();

            try {
                // Step 4: Verify saved session

                Logger.step(`[${role}] Opening ECCS using saved session.`);

                await pomObj.getPage().goto('/eccs', {
                    waitUntil: 'domcontentloaded',
                });

                Logger.debug(`[${role}] ECCS page loaded.`);

                Logger.step(`[${role}] Verifying authenticated home page.`);

                await homePage.waitForHomeReady(10_000);

                Logger.success(`[${role}] Saved session is valid.`);

                Logger.info(`========== AUTH REQUEST COMPLETED: ${role} ==========`);

                return pomObj;
            } /*catch {
                console.log(`[${role}] Saved session expired. Creating a new session.`);

                await context.close();
                contexts.splice(contexts.indexOf(context), 1);
                fs.rmSync(storagePath, { force: true });

                await authenticateUser(browser, role);

                context = await browser.newContext({ storageState: storagePath });
                contexts.push(context);
                pomObj = new PageObjectsManager(await context.newPage());

                return pomObj;
            }
        };

        await use(userLogin);

        await Promise.all(contexts.map((context) => context.close()));
    },
}); */
            catch (error) {

                /*
                 * Step 5: Saved session expired
                 */
                Logger.warn(
                    `[${role}] Saved session is expired or invalid.`
                );

                Logger.debug(
                    `[${role}] Closing expired browser context.`
                );

                await context.close();

                const contextIndex = contexts.indexOf(context);

                if (contextIndex !== -1) {
                    contexts.splice(contextIndex, 1);
                }

                Logger.debug(
                    `[${role}] Removing expired storage state.`
                );

                fs.rmSync(storagePath, {
                    force: true
                });

                Logger.info(
                    `[${role}] Starting fresh authentication.`
                );

                /*
                 * Step 6: Perform fresh authentication
                 */
                await authenticateUser(browser, role);

                Logger.success(
                    `[${role}] Fresh authentication completed.`
                );

                /*
                 * Step 7: Create new authenticated context
                 */
                Logger.debug(
                    `[${role}] Creating new context with fresh session.`
                );

                context = await browser.newContext({
                    storageState: storagePath
                });

                contexts.push(context);

                Logger.debug(
                    `[${role}] New authenticated context created.`
                );

                const page = await context.newPage();

                Logger.debug(
                    `[${role}] New authenticated page created.`
                );

                pomObj = new PageObjectsManager(page);

                Logger.debug(
                    `[${role}] New PageObjectsManager created.`
                );

                Logger.info(
                    `========== AUTH REQUEST COMPLETED: ${role} ==========`
                );

                return pomObj;
            }
        };

        await use(userLogin);

        /*
         * Close all role contexts created by this test
         */
        Logger.info(
            `Closing ${contexts.length} role context(s) for test: ${testInfo.title}`
        );

        await Promise.all(
            contexts.map(async (context) => {
                try {
                    await context.close();
                } catch (error) {
                    Logger.warn(
                        `Failed to close browser context: ${error instanceof Error
                            ? error.message
                            : String(error)
                        }`
                    );
                }
            })
        );

        Logger.info('========== USER LOGIN FIXTURE END ==========');
    },
});

export { expect } from '@playwright/test';