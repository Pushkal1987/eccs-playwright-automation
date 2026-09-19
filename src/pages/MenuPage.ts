import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import Logger from "../utils/LoggerUtils";

export class MenuPage extends BasePage {
    readonly mainMenuLocators: Locator;

    constructor(page: Page) {
        super(page);

        this.mainMenuLocators = page.locator("#main-menu-sz>li.nav-item>a.nav-link");
    }

    /**
     * Navigate through:
     * Main Menu
     *      ↓
     * Sub Menu
     *      ↓
     * Sub Sub Menu (if available)
     */
    async selectMenu(
        expectedMainMenu: string,
        expectedSubMenu: string = "",
        expectedSubSubMenu: string = ""
    ): Promise<void> {

        Logger.info(`Expected Main Menu: ${expectedMainMenu}`);
        Logger.info(`Expected Sub Menu: ${expectedSubMenu}`);
        Logger.info(`Expected Sub Sub Menu: ${expectedSubSubMenu}`);

        await expect(this.mainMenuLocators.first()).toBeVisible();

        const mainMenuCount = await this.mainMenuLocators.count();

        Logger.info(`Main Menu Count: ${mainMenuCount}`);

        // MAIN MENU

        for (let i = 0; i < mainMenuCount; i++) {

            const mainMenuLocator = this.mainMenuLocators.nth(i);

            const mainMenuText = (await mainMenuLocator.textContent())?.trim();

            Logger.info(`Checking Main Menu Name: ${mainMenuText}`);

            if (mainMenuText !== expectedMainMenu) {
                continue;
            }

            Logger.info(`Main Menu Matched: ${mainMenuText}`);

            await mainMenuLocator.click();

            // Locate Main Menu <li>
            const mainMenuItem = mainMenuLocator.locator("xpath=..");

            /*
            // Locate Sub Menu
            const subMenuLocators = mainMenuItem.locator("ul.dropdown-menu a.dropdown-item");
            */
            // Locate Sub Menu
            const subMenuLocators = mainMenuItem.locator(":scope > ul.dropdown-menu > li > a.dropdown-item");

            const subMenuCount = await subMenuLocators.count();

            Logger.info(`Sub Menu Count: ${subMenuCount}`);

            // --------------------------------------------------
            // NO SUB MENU
            // --------------------------------------------------

            if (subMenuCount === 0) {

                Logger.info(`No Sub Menu available. ${mainMenuText} is the final menu.`);

                return;
            }

            // --------------------------------------------------
            // SUB MENU
            // --------------------------------------------------

            for (let j = 0; j < subMenuCount; j++) {

                const subMenuLocator = subMenuLocators.nth(j);

                const subMenuText = (await subMenuLocator.textContent())?.trim();

                Logger.info(`Checking Sub Menu Name: ${subMenuText}`);

                if (subMenuText !== expectedSubMenu) {
                    continue;
                }

                Logger.info(`Sub Menu Matched: ${subMenuText}`);

                await subMenuLocator.click();

                // --------------------------------------------------
                // SUB SUB MENU
                // --------------------------------------------------

                const subMenuItem = subMenuLocator.locator("xpath=..");

                const subSubMenuLocators = subMenuItem.locator(":scope > ul.dropdown-menu > li > a.dropdown-item");

                const subSubMenuCount = await subSubMenuLocators.count();

                Logger.info(`Sub Sub Menu Count: ${subSubMenuCount}`);

                // If sub-sub menu is required
                if (subSubMenuCount > 0 && expectedSubSubMenu !== "") {

                    Logger.info("Sub Sub Menu is available");

                    for (let k = 0; k < subSubMenuCount; k++) {

                        const subSubMenuLocator = subSubMenuLocators.nth(k);

                        const subSubMenuText = (await subSubMenuLocator.textContent())?.trim();

                        Logger.info( `Checking Sub Sub Menu Name: ${subSubMenuText}`);

                        if ( subSubMenuText === expectedSubSubMenu ) {

                            Logger.info( `Sub Sub Menu Matched: ${subSubMenuText}` );

                            await subSubMenuLocator.click();

                            return;
                        }
                    }

                    throw new Error( `Sub Sub Menu '${expectedSubSubMenu}' not found` );
                }

                // No Sub Sub Menu required
                Logger.info( "No Sub Sub Menu required. Sub Menu is the final menu." );

                return;
            }

            throw new Error( `Sub Menu '${expectedSubMenu}' not found` );
        }

        throw new Error( `Main Menu '${expectedMainMenu}' not found` );
    }

    /**
     * Validate destination page using text
     */
    async verifyPageTitle(expectedTitle: string): Promise<void> {

        Logger.info( `Validating destination page: ${expectedTitle}`);

        const title = this.page.getByRole("cell", {
                name: expectedTitle,
                exact: true
            });

        await expect(title).toBeVisible();

        await expect(title).toContainText(expectedTitle);

        Logger.info( `Destination page validated successfully` );
    }
}
