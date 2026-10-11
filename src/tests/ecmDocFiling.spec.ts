import { meta } from 'reporting-labs';
import { test, expect } from '../fixtures/auth.fixture';
import { Logger } from '../utils/LoggerUtils'

test.describe('Verify ECM Document Fresh Filing', () => {
    test.describe.configure({ mode: "serial" });

    let ecmNumber: string = "";

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
        const printECMPage = pageObjectsManager.getPrintECMPage()

        await courierPage.goto('/eccs');
        //await expect(courierPage.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();

        // Complete ECM Document filing business flow.
        ecmNumber = await fileECMDocPage.fileFreshECMDocument();

        // Check ECM status
        Logger.info(`Checking ECM status for ${ecmNumber}`);

        await printECMPage.printECM(ecmNumber);
        const status: string = await printECMPage.getECMStatus(ecmNumber);

        await expect(status).toContain('FILED');
        Logger.success(`ECM: "${ecmNumber}", Status: "${status}" validated successfully.`)
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
        //await expect(courierPage.getByText('AVAILABLE WORK SUMMARY')).toBeVisible();

        await feedIGMNumberPage.selectMenu();
        const heading = await feedIGMNumberPage.getIGMNumberUpdationHeading();
        Logger.info(`Heading in Test: ${heading}`);

        await feedIGMNumberPage.clickECMRefernceNumberHyperlink(ecmNumber);
        Logger.info(`ECM NUmber in Feed IGM: ${ecmNumber}`);

        await feedIGMNumberPage.verifyECMDetails(ecmNumber);
    })

})