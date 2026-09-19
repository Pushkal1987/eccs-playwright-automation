import { test, expect, Locator } from "@playwright/test";
import Logger from "../utils/LoggerUtils";

test("test the menu selection", async ({ page }) => {

    Logger.info("========== MENU TEST STARTED ==========");
    await page.goto("/eccs");
    await expect(page).toHaveTitle("Express Cargo Clearance System");

    const expectedMainMenu = "REFUND";
    const expectedSubMenu = "View Refund Order (Refund Order View)";
    const expectedSubSubMenu = "";
    const expectedTitle = "SEARCH CRITERION TO VIEW REFUND CLAIM";

    Logger.info("Getting Main Menu Locators");
    const mainMenuLocators = page.locator("#main-menu-sz > li.nav-item > a.nav-link");
    await expect(mainMenuLocators.first()).toBeVisible();
    Logger.info(`Main Menu Count: ${await mainMenuLocators.count()}`);

    for (let i = 0; i < await mainMenuLocators.count(); i++) {
        const mminMenuLocator = mainMenuLocators.nth(i);
        const mainMenuText = (await mainMenuLocators.nth(i).textContent())?.trim();

        Logger.info(`Checking Main Menu Name: ${mainMenuText}`);
        if (mainMenuText === expectedMainMenu) {
            Logger.info(`Clicking on Menu: ${mainMenuText}`);
            await mainMenuLocators.nth(i).click();

            // Locate the submenu inside the Main Menu item
            const mainMenuItem = mainMenuLocators.nth(i).locator("..");
            const subMenuLocators = mainMenuItem.locator("ul.dropdown-menu a.dropdown-item");

            const subMenuCount = await subMenuLocators.count();
            Logger.info(`Sub Menu Count: ${subMenuCount}`);

            if (subMenuCount === 0) {

                // Main menu itself opens the page
                Logger.info(`No Sub Menu available. ${mainMenuText} is the final menu.`);

                const title = page.getByRole("cell", { name: expectedTitle, exact: true });
                await expect(title).toContainText(expectedTitle);
            } else {

                for (let j = 0; j < subMenuCount; j++) {
                    const subMenuText = (await subMenuLocators.nth(j).textContent())?.trim();

                    Logger.info(`Checking Sub Menu Name: ${subMenuText}`);
                    if (subMenuText === expectedSubMenu) {
                        Logger.info(`Clicking on Sub Menu: ${subMenuText}`);
                        await subMenuLocators.nth(j).click();

                        // Locate the subSubMenu inside the Sub Menu item
                        const subMenuItem = subMenuLocators.nth(j).locator("..");
                        const subSubMenuLocators = subMenuItem.locator("ul.dropdown-menu li a.dropdown-item");

                        const subSubMenuCount = await subSubMenuLocators.count();

                        Logger.info(`Sub Sub Menu Count: ${subSubMenuCount}`);

                        if (subSubMenuCount > 0 && expectedSubSubMenu) {

                            Logger.info("Sub-sub menu is available");

                            for (let k = 0; k < subSubMenuCount; k++) {
                                const subSubMenuText = (await subSubMenuLocators.nth(k).textContent())?.trim();
                                Logger.info(`Checking Sub Sub Menu Name: ${subSubMenuText}`);
                                if (subSubMenuText === expectedSubSubMenu) {
                                    Logger.info(`Clickng on Sub Sub Menu: ${subSubMenuText}`);
                                    await subSubMenuLocators.nth(k).click();

                                    break;
                                }
                            }
                        } else {

                            Logger.info("No Sub Sub Menu available. Sub Menu is the final menu.");
                        }

                        // Validate destination page
                        const title: Locator = page.getByRole('cell', { name: expectedTitle, exact: true });
                        await expect(title).toContainText(expectedTitle);

                        break;
                    }
                }
                break;
            }
            // Stop checking other main menus
            break;
        }
    }
    Logger.info("========== MENU TEST ENDED Logger ==========");
});