import { Locator, Page } from '@playwright/test';
import { routes } from '../constants/routes';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  private readonly otpInput: Locator;
  private readonly otpSentMessage: Locator;
  private readonly verifyOTPButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.getByRole('textbox', { name: /username/i });
    this.passwordInput = this.page.getByRole('textbox', { name: /password/i });
    this.loginButton = this.page.getByRole('button', { name: /login/i });
    this.otpInput = this.page.getByRole('textbox', { name: 'Enter OTP' });
    this.otpSentMessage = this.page.getByText('OTP has been sent on');
    this.verifyOTPButton = this.page.getByRole('button', { name: 'Validate OTP' });
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
    await this.loginButton.click({ noWaitAfter: true });
  }

  async waitForOTPSentMessage(): Promise<void> {
    await this.waitForVisible(this.otpSentMessage);
  }

  async enterOTP(otp: string): Promise<void> {
    await this.fill(this.otpInput, otp);
  }

  async clickVerifyOTPButton(): Promise<void> {
    await this.click(this.verifyOTPButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.openURL();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async completeOTPLogin(otp: string): Promise<void> {
    await this.waitForOTPSentMessage();
    await this.enterOTP(otp);
    await this.clickVerifyOTPButton();
  }
}