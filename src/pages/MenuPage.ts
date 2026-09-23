import { expect, Locator, Page } from '@playwright/test';
import Logger from '../utils/LoggerUtils';
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
    readonly mainMenuLocators: Locator;

    constructor(page: Page) {
        super(page);
        this.mainMenuLocators = page.locator('#main-menu-sz > li.nav-item > a.nav-link');
    }

    private async findMenuItem(menuLocator: Locator, expectedText: string, menuName: string): Promise<Locator | null> {
        const count = await menuLocator.count();

        for (let index = 0; index < count; index++) {
            const item = menuLocator.nth(index);
            const text = (await item.textContent())?.trim() ?? '';

            Logger.info(`Checking ${menuName}: ${text}`);

            if (text === expectedText) {
                Logger.info(`${menuName} matched: ${text}`);
                return item;
            }
        }

        return null;
    }

    private async clickNestedMenu(
        menu: Locator,
        expectedSubMenu: string,
        expectedSubSubMenu: string = ''
    ): Promise<void> {
        const subMenuLocators = menu.locator(':scope > ul.dropdown-menu > li > a.dropdown-item');
        const subMenu = await this.findMenuItem(subMenuLocators, expectedSubMenu, 'Sub Menu');

        if (!subMenu) {
            throw new Error(`Sub Menu '${expectedSubMenu}' not found`);
        }

        await subMenu.click();

        if (!expectedSubSubMenu) {
            Logger.info('No Sub Sub Menu required. Sub Menu is the final menu.');
            return;
        }

        const subMenuItem = subMenu.locator('xpath=..');
        const subSubMenuLocators = subMenuItem.locator(':scope > ul.dropdown-menu > li > a.dropdown-item');
        const subSubMenu = await this.findMenuItem(subSubMenuLocators, expectedSubSubMenu, 'Sub Sub Menu');

        if (!subSubMenu) {
            throw new Error(`Sub Sub Menu '${expectedSubSubMenu}' not found`);
        }
        await subSubMenu.click();
    }

    async selectMenu(expectedMainMenu: string, expectedSubMenu: string = '', expectedSubSubMenu: string = ''): Promise<void> {
        Logger.info(`Expected Main Menu: ${expectedMainMenu}`);
        Logger.info(`Expected Sub Menu: ${expectedSubMenu}`);
        Logger.info(`Expected Sub Sub Menu: ${expectedSubSubMenu}`);

        await expect(this.mainMenuLocators.first()).toBeVisible();

        const mainMenu = await this.findMenuItem(this.mainMenuLocators, expectedMainMenu, 'Main Menu');

        if (!mainMenu) {
            throw new Error(`Main Menu '${expectedMainMenu}' not found`);
        }

        await mainMenu.click();

        const mainMenuItem = mainMenu.locator('xpath=..');
        const subMenuLocators = mainMenuItem.locator(':scope > ul.dropdown-menu > li > a.dropdown-item');
        const subMenuCount = await subMenuLocators.count();

        Logger.info(`Sub Menu Count: ${subMenuCount}`);

        if (subMenuCount === 0) {
            Logger.info(`No Sub Menu available. ${expectedMainMenu} is the final menu.`);
            return;
        }

        if (!expectedSubMenu) {
            Logger.info('No Sub Menu required. Main Menu is the final menu.');
            return;
        }

        await this.clickNestedMenu(mainMenuItem, expectedSubMenu, expectedSubSubMenu);
    }

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        Logger.info(`Validating destination page: ${expectedTitle}`);

        const title = this.page.getByRole('cell', { name: expectedTitle, exact: true });

        await expect(title).toBeVisible();
        await expect(title).toContainText(expectedTitle);

        Logger.info('Destination page validated successfully');
    }
}
