import { test, expect } from "../fixtures/BaseTest"
import Logger from "../utils/LoggerUtils";


test("test the menu selection", async ({ page, pageObjectsManager }) => {
    await page.goto('/eccs');
    await expect(page).toHaveTitle('Express Cargo Clearance System');

    const mainMenu = pageObjectsManager.getMenuPage();

    const expectedMainMenu = "IMPORT";
    const expectedSubMenu = "Print CBE";
    const expectedSubSubMenu = "XIII  (Print/View)";
    const expectedTitle = "SEARCH CRITERION";

    // Select Menu
    await mainMenu.selectMenu(expectedMainMenu, expectedSubMenu, expectedSubSubMenu);

    // Validate destination page 
    await mainMenu.verifyPageTitle(expectedTitle);
})
