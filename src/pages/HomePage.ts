import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/LoggerUtils';

export class HomePage extends BasePage {

  private readonly workSummaryHeader: Locator;
  private readonly logoutButton: Locator;
  private readonly loggedInUser: Locator;
  private readonly mainMenuLocators: Locator;

  constructor(page: Page) {
    super(page);

    this.workSummaryHeader = this.page.getByText('AVAILABLE WORK SUMMARY', { exact: true });
    this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
    this.loggedInUser = this.page.locator('div.col-lg-4').last();
    this.mainMenuLocators = page.locator('#main-menu-sz > li.nav-item > a.nav-link');
  }

  async waitForHomeReady(timeout = 120000): Promise<void> {
    await this.workSummaryHeader.waitFor({ state: 'visible', timeout });
  }

  async getLoggedInUser(): Promise<string> {
    const loggedInText = await this.loggedInUser.textContent();
    return loggedInText
      ?.replace(/\s+/g, " ")
      .replace("Logged In :", "")
      .trim() ?? "";
  }

  async getLogoutButton(): Promise<Locator> {
    return this.logoutButton;
  }

  async clickLogout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  async getWorkSummaryTitle(): Promise<string> {
    return this.getText(this.workSummaryHeader);
  }

  private async findMenuItem(
    menuLocator: Locator,
    expectedText: string,
    menuName: string): Promise<Locator | null> {

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

