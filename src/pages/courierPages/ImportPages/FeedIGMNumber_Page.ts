import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../BasePage";
import { HomePage } from "../../HomePage";
import { menuSelectionData } from "../../../test-data/courier/menuSelectionData";
import { feedIGMNumberData } from "../../../test-data/courier/feedIGMNumberData";
import { Logger } from "../../../utils/LoggerUtils";


export class FeedIGMNumber_Page extends BasePage {

    private readonly homePage: HomePage;

    // Menu Selection 
    private readonly mainMenu: string = menuSelectionData.feedIGMNumber_MenuSelectionData.mainMenu;
    private readonly subMenu: string = menuSelectionData.feedIGMNumber_MenuSelectionData.subMenu;
    private readonly subSubMenu: string = menuSelectionData.feedIGMNumber_MenuSelectionData.subSubMenu;

    private readonly igmNumberUpdationHeading: Locator;

    constructor (page: Page) {
        super(page);

        this.homePage = new HomePage(page);

        this.igmNumberUpdationHeading = page.getByText('IGM Number Updation');
    }

    async selectMenu(): Promise<void> {
        Logger.info(`Selecting Menu: ${this.mainMenu} > ${this.subMenu} > ${this.subSubMenu}`);
        await this.homePage.selectMenu(this.mainMenu, this.subMenu, this.subSubMenu);
    }

    async getIGMNumberUpdationHeading(): Promise<string> {
        Logger.info(`Getting heading: ${this.igmNumberUpdationHeading.textContent()}`);
        const heading = await this.getText(this.igmNumberUpdationHeading);
        Logger.info(`Heading: ${heading}`);
        return heading;
    }
}