import { Page } from '@playwright/test';

import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';

export class PageObjectsManager {
  private readonly page: Page;

  private basePage?: BasePage;
  private loginPage?: LoginPage;
  private menuPage?: MenuPage;
  private homePage?: HomePage;

  constructor(page: Page) {
    this.page = page;
  }
  getPage(): Page {
    return this.page;
  }

  getBasePage(): BasePage {
    if (!this.basePage) {
      this.basePage = new BasePage(this.page);
    }
    return this.basePage;
  }

  getLoginPage(): LoginPage {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page);
    }
    return this.loginPage;
  }

  getMenuPage(): MenuPage {
    if (!this.menuPage) {
      this.menuPage = new MenuPage(this.page);
    }
    return this.menuPage;
  }

  getHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.page);
    }
    return this.homePage;
  }
}