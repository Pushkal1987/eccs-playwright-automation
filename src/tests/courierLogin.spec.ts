import {test, expect} from '../fixtures/BaseTest';
import { Logger } from '../utils/LoggerUtils'

test.describe('Courier Login', () => {
    test('Courier should access Home Page', async({pageObjectsManager, page}) => {

        const dashboardPage = pageObjectsManager.getDashboardPage();
        await page.goto('/eccs');
        await expect(page.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();
        const eccsHeading = await dashboardPage.getDashboardTitle();
        Logger.info(`Heading: ${eccsHeading}`)
        await expect(eccsHeading).toContain('AVAILABLE WORK SUMMARY');
    })

    test('ECM Filing', async ({ page }) => {
        await page.goto('/eccs');
        const importMenu = page.getByRole('link', { name: 'IMPORT' });
        await importMenu.click();
        const manualFiling = page.getByRole('link', { name: 'Manual Filing +' });
        await manualFiling.click();
        const fileECMDocs =  page.getByRole('link', { name: 'File ECM - Documents' });
        await fileECMDocs.click();
        const ecmHeading = await page.getByRole('cell', { name: 'Express Cargo Manifest (ECM)' }).textContent();
        expect(ecmHeading).toBe('Express Cargo Manifest (ECM) Filing - Document ');
        await page.getByRole('link', {name: 'Fresh ECM'}).click();
    });
})