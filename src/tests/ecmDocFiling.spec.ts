import { meta } from 'reporting-labs';
import { test, expect } from '../fixtures/auth.fixture';
import { Logger } from '../utils/LoggerUtils'

test.describe('Verify ECM Document Fresh Filing', () => {

    let ecmNumber: string | null = null;
    test.describe.configure({ mode: "serial" });

    test('Verify ECM Document Fresh Filing', async ({ userLogin }) => {

        meta({
            priority: 'P1',
            severity: 'blocker',
            owner: 'Pushkal R. Shripad',
            feature: 'ECM Documnet filling'
        });

        const pageObjectsManager = await userLogin('COURIER');

        const courierPage = pageObjectsManager.getPage();
        const fileECMDocPage = pageObjectsManager.getFileECMDOCPage();

        await courierPage.goto('/eccs');
        await expect(courierPage.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();

        // Complete ECM Document filing business flow.
        //await fileECMDocPage.fileFreshECMDocument();
        ecmNumber = await fileECMDocPage.fileFreshECMDocument();

        if (ecmNumber) {
            Logger.success(`ECM Number generated in test: ${ecmNumber}`);
        } else {
            Logger.warn('ECM filing was already initiated for this flight.');
        }
    })

    test(`Verify ECM Number Status`, async ({ userLogin}) => {
        meta({
            priority: 'P3',
            severity: 'minor',
            owner: 'Pushkal R. Shripad',
            feature: 'Print ECM'
        });

        if (ecmNumber === null) {
            throw new Error('Cannot verify ECM status because the filing test did not capture an ECM number.');
        }

        const pageObjectsManager = await userLogin('COURIER');

        const courierPage = pageObjectsManager.getPage();
        const printECMPage = pageObjectsManager.getPrintECMPage();

        await courierPage.goto('/eccs');
        await expect(courierPage.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();

        await printECMPage.printECM(ecmNumber);
        await printECMPage.getECMStatus(ecmNumber);
    })

    test('Verify Feed IGM Number', async ({ userLogin }) => {
        meta({
            priority: 'P1',
            severity: 'blocker',
            owner: 'Pushkal R. Shripad',
            feature: 'Feed IGM Number'
        });

        const pageObjectsManager = await userLogin('COURIER');

        const courierPage = pageObjectsManager.getPage();
        const feedIGMNumberPage = pageObjectsManager.getFeedIGMNumberPage()

        await courierPage.goto('/eccs');
        await expect(courierPage.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();

        await feedIGMNumberPage.selectMenu();
        const heading = await feedIGMNumberPage.getIGMNumberUpdationHeading();
        Logger.info(`Heading in Test: ${heading}`);
    })

})