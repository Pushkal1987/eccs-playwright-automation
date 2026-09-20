import { Page } from '@playwright/test';

import { BasePage } from '../pages/BasePage';
import { DashboardPage } from '../pages/DashBoardPage';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';

export class PageObjectsManager {
  private readonly page: Page;

  private basePage?: BasePage;
  private loginPage?: LoginPage;
  private menuPage?: MenuPage;
  private dashboardPage?: DashboardPage;

  constructor(page: Page) {
    this.page = page;
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

  getDashboardPage(): DashboardPage {
    if (!this.dashboardPage) {
      this.dashboardPage = new DashboardPage(this.page);
    }
    return this.dashboardPage;
  }
}