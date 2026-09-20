import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    
  private readonly workSummaryHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.workSummaryHeader = this.page.getByText('AVAILABLE WORK SUMMARY', { exact: true });
  }

  async waitForDashboardReady(timeout = 120000): Promise<void> {
    await this.workSummaryHeader.waitFor({ state: 'visible', timeout });
  }

  async getDashboardTitle(): Promise<string> {
    return this.getText(this.workSummaryHeader);
  }
}
