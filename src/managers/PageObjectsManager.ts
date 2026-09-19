import { Page } from "@playwright/test";

import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/LoginPage";
import { MenuPage } from "../pages/MenuPage";

export class PageObjectsManager {

    private basePage?: BasePage;
    private loginPage?: LoginPage;
    private menuPage?: MenuPage;

    constructor(private page: Page) { }    

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
}