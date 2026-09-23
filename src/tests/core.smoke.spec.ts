import { test, expect } from '../fixtures/BaseTest';
import { Logger } from '../utils/LoggerUtils';

test.describe('ECCS smoke checks', () => {
  test('@smoke courier dashboard loads after auth', async ({ pageObjectsManager, page }) => {
    Logger.info('Starting courier dashboard smoke check');

    const dashboardPage = pageObjectsManager.getDashboardPage();

    await page.goto('/eccs');
    await dashboardPage.waitForDashboardReady();

    const heading = await dashboardPage.getDashboardTitle();
    Logger.info(`Dashboard heading: ${heading}`);

    expect(heading).toContain('AVAILABLE WORK SUMMARY');
  });
});
