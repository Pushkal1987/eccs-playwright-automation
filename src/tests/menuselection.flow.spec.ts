import { test, expect } from "@playwright/test"
import { RoleContext } from "../utils/RoleContextUtils";
import Logger from "../utils/LoggerUtils";
import { log, meta, testData } from "reporting-labs";


test("test the menu selection", async ({ browser }) => {

    meta({priority: 'P1', severity: 'critical', owner: 'Pushkal Shripad', story: 'US101', epic: '102', feature: 'Login Test', issue: 'Bug-901'});

    await testData({username: 'Courier_user', password: 'Abc@123'}, 'Login');
    Logger.info("==================================================");
    Logger.info("MENU SELECTION TEST STARTED");
    await log('MENU SELECTION TEST STARTED');
    const courier: RoleContext = await RoleContext.create(browser, 'COURIER');
    //const custodian: RoleContext = await RoleContext.create(browser, 'CUSTODIAN');

    try {
        Logger.info("========== COURIER FLOW STARTED ==========");

        Logger.info("Navigating Courier to ECCS application");
        await courier.page.goto('/eccs');

        Logger.info("Validating Courier page title");
        await expect(courier.page).toHaveTitle('Express Cargo Clearance System');

        Logger.success("Courier successfully opened ECCS application");

        const courierMenu = courier.pageObjectsManager.getMenuPage();

        const expectedMainMenu = "IMPORT";
        const expectedSubMenu = "Print CBE";
        const expectedSubSubMenu = "XIII  (Print/View)";
        const expectedTitle = "SEARCH CRITERION";

        // Select Menu
        Logger.info("Selecting Courier menu");
        await courierMenu.selectMenu(expectedMainMenu, expectedSubMenu, expectedSubSubMenu);

        Logger.success(`Menu selected successfully: ${expectedMainMenu} > ${expectedSubMenu} > ${expectedSubSubMenu}`);
        
        // Validate destination page 
        Logger.info("Validating destination page");
        await courierMenu.verifyPageTitle(expectedTitle);
        Logger.success(`Destination page validated successfully: ${expectedTitle}`);

        Logger.success("========== COURIER FLOW COMPLETED ==========");

        Logger.info("========== CUSTODIAN FLOW STARTED ==========");
        // Write custodian flow here

    } finally {
        Logger.info("Closing Courier role context");
        await courier.context.close();

        //Logger.info("Closing Custodian role context");
        //await custodian.context.close();

        Logger.info("MENU SELECTION TEST COMPLETED");
        Logger.info("==================================================");
    }
})
