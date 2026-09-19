import { test as base, expect } from "@playwright/test";
import { PageObjectsManager } from "../managers/PageObjectsManager";
import { Logger } from "../utils/LoggerUtils";
import { cleanErrorMessage } from "../hooks/testHooks";

type Fixtures = {
    pageObjectsManager: PageObjectsManager;
    testSetup: void;
};

export const test = base.extend<Fixtures>({  // base.extend() → Create custom fixtures 

    // Runs automatically before every test 
    testSetup: [
        async ({ page }, use, testInfo) => {

        Logger.info("===============================");
        Logger.info(`Test File: ${testInfo.file}`);
        Logger.test(`Starting Test: ${testInfo.title}`);
        Logger.info(`Browser: ${testInfo.project.name}`);
        Logger.info(`Worker Index: ${testInfo.workerIndex}`);
        Logger.step("Test setup started");

        // Authentication is handled by auth.setup.ts
        // using storageState().
        //
        // Therefore we should NOT navigate to the
        // SSO login page here.

        Logger.success("Test setup completed");

        await use();
    },

    {
        auto: true
    }
    ],

    // Page Object Manager 
    pageObjectsManager: async ({ page }, use) => {  // use() → Hand control/value to the test 
        Logger.debug("Initializing PageObjectsManager");

        const pageObjectsManager = new PageObjectsManager(page);

        await use(pageObjectsManager);

        Logger.debug("PageObjectsManager fixture completed");
    },
});

// ========================================== 
// After Each Test 
// ==========================================  // afterEach() → Execute common logic after every test 

test.afterEach(async ({ page }, testInfo) => {   // testInfo → Access test metadata and failure information 

    Logger.step(`Test execution completed: ${testInfo.title}`);

    // ========================================== 
    // TEST PASSED 
    // ========================================== 

    if (
        testInfo.status === testInfo.expectedStatus &&
        testInfo.status === "passed"
    ) {
        Logger.success(`Test Passed: ${testInfo.title}`);
    }

    // ========================================== 
    // TEST FAILED 
    // ========================================== 

    else {
        Logger.error(`Test Failed: ${testInfo.title}`);
        Logger.error(`Actual Status: ${testInfo.status}`);
        Logger.error(`Expected Status: ${testInfo.expectedStatus}`);

        // Error details 
        if (testInfo.error) {
            const errorMessage = testInfo.error.message;

            if (errorMessage) {
                Logger.error(`Message: ${cleanErrorMessage(errorMessage)}`);
            }

            const errorStack = testInfo.error.stack;

            if (errorStack) {
                const cleanedStack = cleanErrorMessage(errorStack);

                Logger.error(`Stack Trace:\n${cleanedStack}`);

                // Find test location 
                const stackLines = cleanedStack.split("\n");

                const testLocation = stackLines.find(
                    line => line.includes(".spec.ts:")
                );

                if (testLocation) {
                    Logger.error(`Failure Location: ${testLocation.trim()}`);
                }
            }
        }

        // ========================================== 
        // FAILURE SCREENSHOT 
        // ========================================== 

        const screenshotPath = testInfo.outputPath("failure.png");  // testInfo.outputPath() → Create test-specific artifact path 

        try {
            await page.screenshot({
                path: screenshotPath,
                fullPage: true
            });

            Logger.error(`Screenshot: ${screenshotPath}`);
        } catch (error) {
            Logger.error(`Unable to capture screenshot: ${error}`);
        }
    }

    Logger.info("===============================");
});
export { expect }; 