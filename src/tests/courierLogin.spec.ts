import { test, expect } from '../fixtures/auth.fixture';

test.describe('Courier Login', () => {
    test('Courier should access Home Page', async ({ userLogin }) => {
        const pageObjectsManager = await userLogin('COURIER');
        const courierPage = pageObjectsManager.getPage();

        await courierPage.goto('/eccs');
        await expect(courierPage.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();
    });

    test('ECM Filing', async ({ userLogin }) => {
        const pageObjectsManager = await userLogin('COURIER');
        const courierPage = pageObjectsManager.getPage();
        await courierPage.goto('/eccs');
        const importMenu = courierPage.getByRole('link', { name: 'IMPORT' });
        await importMenu.click();
        const manualFiling = courierPage.getByRole('link', { name: 'Manual Filing +' });
        await manualFiling.click();
        const fileECMDocs = courierPage.getByRole('link', { name: 'File ECM - Documents' });
        await fileECMDocs.click();
        const ecmHeading = await courierPage.getByRole('cell', { name: 'Express Cargo Manifest (ECM)' }).textContent();
        expect(ecmHeading).toBe('Express Cargo Manifest (ECM) Filing - Document ');
        await courierPage.getByRole('link', { name: 'Fresh ECM' }).click();
    });
})