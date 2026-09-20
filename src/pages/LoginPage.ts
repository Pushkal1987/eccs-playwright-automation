import { Locator, Page } from '@playwright/test';
import { routes } from '../constants/routes';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.getByRole('textbox', { name: /username/i });
    this.passwordInput = this.page.getByRole('textbox', { name: /password/i });
    this.loginButton = this.page.getByRole('button', { name: /login/i });
  }

  async openURL(): Promise<void> {
    await this.navigateTo(routes.login);
  }

  async enterUsername(username: string): Promise<void> {
    await this.waitForVisible(this.usernameInput);
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.waitForVisible(this.passwordInput);
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.openURL();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}