import { Page } from '@playwright/test';

import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { FileECM_DOC_Page } from '../pages/courierPages/ImportPages/FileECM_DOC_Page';
import { FeedIGMNumber_Page } from '../pages/courierPages/ImportPages/FeedIGMNumber_Page';
import { PrintECM_page } from '../pages/courierPages/ImportPages/PrintECM_Page';
//import { MenuPage } from '../pages/MenuPage';

export class PageObjectsManager {
  private readonly page: Page;

  private basePage?: BasePage;
  private loginPage?: LoginPage;
  //private menuPage?: MenuPage;
  private homePage?: HomePage;
  private fileECMDOCPage?: FileECM_DOC_Page;
  private feedIGMNumberPage?: FeedIGMNumber_Page;
  private printECMPage?: PrintECM_page;

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

  /*
  getMenuPage(): MenuPage {
    if (!this.menuPage) {
      this.menuPage = new MenuPage(this.page);
    }
    return this.menuPage;
  }
    */

  getHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.page);
    }
    return this.homePage;
  }

  getFileECMDOCPage(): FileECM_DOC_Page {
    if (!this.fileECMDOCPage) {
      this.fileECMDOCPage = new FileECM_DOC_Page(this.page);
    }
    return this.fileECMDOCPage;
  }

  getFeedIGMNumberPage(): FeedIGMNumber_Page {
    if (!this.feedIGMNumberPage) {
      this.feedIGMNumberPage = new FeedIGMNumber_Page(this.page);
    }
    return this.feedIGMNumberPage;
  }

  getPrintECMPage(): PrintECM_page {
    if (!this.printECMPage) {
      this.printECMPage = new PrintECM_page(this.page);
    }
    return this.printECMPage;
  }
}