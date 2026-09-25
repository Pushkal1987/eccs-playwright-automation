import { test, expect } from '../fixtures/auth.fixture';
import Logger from "../utils/LoggerUtils";
import { MenuSelectionData } from "../test-data/MenuSelectionData";

test.describe("@smoke Menu Selection Test", () => {

    test("test the menu selection", async ({ userLogin }) => {
        const userRole = 'COURIER';
        const pageObjectsManager = await userLogin(userRole);
        const courierPage = pageObjectsManager.getPage();
        //const menuPage = pageObjectsManager.getMenuPage();
        const homePage = pageObjectsManager.getHomePage();

        Logger.info("==================================================");
        Logger.info("========== MENU SELECTION TEST STARTED ==========");

        const expectedMainMenu = MenuSelectionData.expectedMainMenu;
        const expectedSubMenu = MenuSelectionData.expectedSubMenu;
        const expectedSubSubMenu = MenuSelectionData.expectedSubSubMenu;
        const expectedTitle = MenuSelectionData.expectedTitle;

            Logger.info(`Navigating ${userRole} to ECCS application`);
            await courierPage.goto('/eccs');

            Logger.info(`Validating Homepage is loaded for ${userRole}`);
            expect(await homePage.getLogoutButton()).toBeVisible();
            Logger.success(`${userRole} successfully opened ECCS application`);
       
            /*
            Logger.info(`Validating ${userRole} page title`);
            await expect(await homePage.getLoggedInUser()).toContain(`${userRole}`);
            Logger.success(`${userRole} successfully logged in as ${await homePage.getLoggedInUser()}`);
            */

            await expect(courierPage).toHaveTitle('Express Cargo Clearance System');
            Logger.success(`Title validated successfully for ${userRole}: ${await courierPage.title()}`);
      
            Logger.info(`Selecting ${userRole} menu: ${expectedMainMenu} > ${expectedSubMenu} > ${expectedSubSubMenu}`);
            await homePage.selectMenu(expectedMainMenu, expectedSubMenu, expectedSubSubMenu);
            Logger.success(`Menu selected successfully: ${expectedMainMenu} > ${expectedSubMenu} > ${expectedSubSubMenu}`);

            Logger.info(`Validating ${userRole} destination page title: ${expectedTitle}`);
            await homePage.verifyPageTitle(expectedTitle);
            Logger.success(`Destination page validated successfully: ${expectedTitle}`);

        Logger.success(`========== ${userRole} FLOW COMPLETED ==========`);
        
        Logger.info("========== MENU SELECTION TEST COMPLETED ==========");
        Logger.info("==================================================");
    });
});
