import { test, expect } from "@playwright/test"
import { RoleContext } from "../utils/RoleContextUtils";
import Logger from "../utils/LoggerUtils";
import { MenuSelectionData } from "../test-data/MenuSelectionData";

test.describe("Menu Selection Test", () => {

    test("test the menu selection", async ({ browser }) => {

        Logger.info("==================================================");
        Logger.info("========== MENU SELECTION TEST STARTED ==========");

        const courier: RoleContext = await RoleContext.create(browser, 'COURIER');
        //const custodian: RoleContext = await RoleContext.create(browser, 'CUSTODIAN');

        const courierMenu = courier.pageObjectsManager.getMenuPage();

        const expectedMainMenu = MenuSelectionData.expectedMainMenu;
        const expectedSubMenu = MenuSelectionData.expectedSubMenu;
        const expectedSubSubMenu = MenuSelectionData.expectedSubSubMenu;
        const expectedTitle = MenuSelectionData.expectedTitle;

        try {
            Logger.info("========== COURIER FLOW STARTED ==========");

            await test.step("Navigate Courier to ECCS application", async () => {
                Logger.info("Navigating Courier to ECCS application");
                await courier.page.goto('/eccs');
            });

            await test.step("Validate Courier page title", async () => {
                Logger.info("Validating Courier page title");
                await expect(courier.page).toHaveTitle('Express Cargo Clearance System');
                Logger.success("Courier successfully opened ECCS application");
            });

            await test.step(`Select menu: ${expectedMainMenu} > ${expectedSubMenu} > ${expectedSubSubMenu}`, async () => {
                Logger.info(`Selecting Courier menu: ${expectedMainMenu} > ${expectedSubMenu} > ${expectedSubSubMenu}`);
                await courierMenu.selectMenu(expectedMainMenu, expectedSubMenu, expectedSubSubMenu);
                Logger.success(`Menu selected successfully: ${expectedMainMenu} > ${expectedSubMenu} > ${expectedSubSubMenu}`);
            }
            );

            await test.step(`Validate destination page title: ${expectedTitle}`, async () => {
                Logger.info(`Validating Courier destination page title: ${expectedTitle}`);
                await courierMenu.verifyPageTitle(expectedTitle);
                Logger.success(`Destination page validated successfully: ${expectedTitle}`);
            }
            );

            Logger.success("========== COURIER FLOW COMPLETED ==========");

            //Logger.info("========== CUSTODIAN FLOW STARTED ==========");
            // Write custodian flow here

        } finally {

            await test.step("Closing role contexts", async () => {
                Logger.info("Closing Courier role context");
                await courier.context.close();
            });

            /*
            await test.step("Closing role contexts", async () => {
            Logger.info("Closing Custodian role context");  
            await custodian.context.close();
            });
            */

            Logger.info("========== MENU SELECTION TEST COMPLETED ==========");
            Logger.info("==================================================");
        }
    });
})
