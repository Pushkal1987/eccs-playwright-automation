import { expect, Locator, Page } from '@playwright/test';
import { routes } from '../constants/routes';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly availableHeading: Locator;


    constructor(page: Page) {
        super(page);

        this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });

        this.availableHeading = this.page.getByRole('heading', { name: 'Enter your Single Sign-On credentials below' });
    }

    // These locators are common for all roles.
    // Replace the labels if your application uses different labels.


    async openURL(): Promise<void> {
        await this.navigateTo(routes.login);
    }

    async enterUsername(username: string): Promise<void> {
        await this.fill(this.usernameInput, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordInput, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.click(this.loginButton);
    }

    async login(username: string, password: string): Promise<void> {
        // Open the common login page.
        await this.openURL();

        // Fill the credentials received from the caller.
        await this.enterUsername(username);
        await this.enterPassword(password);

        // Submit the login form.
        await this.clickLoginButton();

        // All roles go to the dashboard after successful login.
        // Change this URL check if your dashboard URL is different.
        //await expect(this.availableHeading).toHaveText('Enter your Single Sign-On credentials below');
    }
}