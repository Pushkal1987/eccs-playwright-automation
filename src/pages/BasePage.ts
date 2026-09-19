import { Page, Locator } from '@playwright/test' 
 
export class BasePage { 
    constructor(protected readonly page: Page) { }
 
    async navigateTo(url: string) { 
        await this.page.goto(url); 
    } 
 
    async getURL() { 
        return this.page.url(); 
    } 
 
    async getTitle() { 
        return this.page.title(); 
    } 
 
    protected async getText(locator: Locator) { 
        return (await locator.textContent())?.trim() ?? ""; 
    } 
 
    protected async fill(locator: Locator, value: string) { 
        await locator.fill(value); 
    } 
 
    protected async click(locator: Locator) { 
        await locator.click(); 
    } 
 
    protected async check(locator: Locator) { 
        await locator.check(); 
    } 
 
    protected async dropdown(locator: Locator, value: string | string[]) { 
        await locator.selectOption(value); 
    } 
 
    protected async uncheck(locator: Locator) { 
        await locator.uncheck(); 
    } 
 
    protected async isChecked(locator: Locator) { 
        return await locator.isChecked(); 
    } 
 
    protected async hover(locator: Locator) { 
        await locator.hover(); 
    } 
 
    protected async doubleClick(locator: Locator) { 
        await locator.dblclick(); 
    } 
 
    protected async pressSequentially(locator: Locator, value: string) { 
        await locator.pressSequentially(value); 
    } 
 
    protected async waitForLoad() { 
        await this.page.waitForLoadState('networkidle'); 
    } 
 
    protected async waitFor(locator: Locator) { 
        await locator.waitFor(); 
    } 
} 