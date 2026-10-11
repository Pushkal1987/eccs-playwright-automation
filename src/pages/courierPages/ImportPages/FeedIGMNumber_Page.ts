import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../BasePage";
import { HomePage } from "../../HomePage";
import { menuSelectionData } from "../../../test-data/courier/menuSelectionData";
import { ecmDocFilingData } from "../../../test-data/courier/ecmDocFilingData";
import { Logger } from "../../../utils/LoggerUtils";

/**
 * Page Object for the "Feed IGM Number" screen (Courier module).
 * Handles menu navigation, heading validation and ECM reference number lookup.
 * and post-click verification of the ECM details page.
 */


export class FeedIGMNumber_Page extends BasePage {

    private readonly homePage: HomePage;

    // ---------------------------------------------------------------
    // Menu selection data
    // ---------------------------------------------------------------

    private readonly mainMenu: string = menuSelectionData.feedIGMNumber_MenuSelectionData.mainMenu;
    private readonly subMenu: string = menuSelectionData.feedIGMNumber_MenuSelectionData.subMenu;
    private readonly subSubMenu: string = menuSelectionData.feedIGMNumber_MenuSelectionData.subSubMenu;

    // ---------------------------------------------------------------
    // Locators
    // ---------------------------------------------------------------

    private readonly igmNumberUpdationHeading: Locator;
    private readonly tableBody: Locator;
    //private readonly ecmReferenceNumber: Locator;

    // Column indexes of the ECM results table (0-based)
    private static readonly COL_ECM_REFERENCE = 1;
    private static readonly COL_FILING_DATE = 2;
    private static readonly COL_FLIGHT_NUMBER = 3;
    private static readonly COL_DOCUMENT_STATUS = 4;
    private static readonly COL_NON_DOCUMENT_STATUS = 5;

    // Max time (ms) to wait for table rows to render before treating the table as empty
    private static readonly ROWS_RENDER_TIMEOUT = 10000;

    // Constructor
    constructor(page: Page) {
        super(page);

        this.homePage = new HomePage(page);
        this.igmNumberUpdationHeading = page.getByText('IGM Number Updation');
        this.tableBody = page.locator("//table[3]//tbody");
        //this.ecmReferenceNumber = page.locator('tr').locator('td').nth(5);
    }

    // ---------------------------------------------------------------
    // Methods
    // ---------------------------------------------------------------

    /** Navigates to Feed IGM Number via Main Menu > Sub Menu > Sub-Sub Menu. */

    async selectMenu(): Promise<void> {
        Logger.info(`Selecting Menu: ${this.mainMenu} > ${this.subMenu} > ${this.subSubMenu}`);
        await this.homePage.selectMenu(this.mainMenu, this.subMenu, this.subSubMenu);
        Logger.info('Menu selected successfully');
    }

    /** Returns the "IGM Number Updation" heading text displayed on the page. */

    async getIGMNumberUpdationHeading(): Promise<string> {
        Logger.info('Fetching "IGM Number Updation" heading');
        const heading = await this.getText(this.igmNumberUpdationHeading);
        Logger.info(`Heading found: ${heading}`);
        return heading;
    }

    /**
    * Finds the given ECM reference number in the results table and clicks its hyperlink.
    * Rows are scanned bottom to top because the newest records are at the end of the table.
    * 
    * @param ecmNumber ECM reference number to search for.
    * @returns The ECM reference number text as displayed in the table.
    * @throws If the number is empty or not present in the table.
    */

    async clickECMRefernceNumberHyperlink(ecmNumber: string): Promise<string> {
        const number = ecmNumber?.trim();

        // Validate input before touching the UI
        if (!number) {
            Logger.error(`ECM number is not available: "${ecmNumber}"`);
            throw new Error('ECM Number: ${ecmNumber} is not available')
        }

        Logger.info(`Searching for ECM number hyperlink: ${number}`);

        // Wait for the table body to be in the DOM. "attached" is used instead of
        // "visible" because an empty <tbody> has no height and is never "visible".

        await this.tableBody.waitFor({ state: 'attached' });
        Logger.info('Table body is present');

        const rows = this.tableBody.locator('tr');

        // The table can have 0 or more rows, so do not assert that a row exists.
        // Give rows a short time to render, then count what is actually there.
        await rows.first().waitFor({ state: 'visible', timeout: FeedIGMNumber_Page.ROWS_RENDER_TIMEOUT }).catch(() => {
            Logger.info(`No rows became visible within ${FeedIGMNumber_Page.ROWS_RENDER_TIMEOUT} ms`);
        });

        const rowCount = await rows.count();
        Logger.info(`Total rows found: ${rowCount}`);

        // Empty table: fail fast with a clear message instead of a locator timeout
        if (rowCount === 0) {
            Logger.error(`Table has no records. ECM number not found: ${number}`);
            throw new Error(`No records found in the table for ECM Number ${number}`);
        }

        let ecmReferenceNumberText = '';

        // Scan rows bottom to top (newest records are at the end of the table,
        // so the expected ECM is found in the first few iterations)
        for (let i = rowCount - 1; i >= 0; i--) {
            const row = rows.nth(i);
            const cells = row.locator('td');

            // Skip header/spacer rows that do not have enough columns
            if (await cells.count() <= FeedIGMNumber_Page.COL_NON_DOCUMENT_STATUS) {
                continue;
            }

            const ecmReferenceLink = cells.nth(FeedIGMNumber_Page.COL_ECM_REFERENCE);
            const rowEcmNumber = (await ecmReferenceLink.innerText()).trim();

            if (rowEcmNumber !== number) {
                continue;
            }

            // Match found: capture the row details for the log
            const ecmFilingDate = (await cells.nth(FeedIGMNumber_Page.COL_FILING_DATE).innerText()).trim();
            const flightNumber = (await cells.nth(FeedIGMNumber_Page.COL_FLIGHT_NUMBER).innerText()).trim();
            const documentECMStatus = (await cells.nth(FeedIGMNumber_Page.COL_DOCUMENT_STATUS).innerText()).trim();
            const nonDocumentECMStatus = (await cells.nth(FeedIGMNumber_Page.COL_NON_DOCUMENT_STATUS).innerText()).trim();

            Logger.info(
                `Row ${i} matched -> ECM No.: ${rowEcmNumber}, Filing Date: ${ecmFilingDate}, ` +
                `Flight No.: ${flightNumber}, Document ECM Status: ${documentECMStatus}, ` +
                `Non-Document ECM Status: ${nonDocumentECMStatus}`
            );

            const ecmNumberLink = this.page.getByRole('link', { name: ecmNumber, exact: true });
            if (await ecmNumberLink.isVisible()) {
                Logger.info('ECM details are still on the list; accepting the confirmation to open the selected ECM.');
                this.page.once('dialog', dialog => dialog.accept());
                await ecmNumberLink.click();
            }
            
            ecmReferenceNumberText = rowEcmNumber;
            break;
        }

        // No row matched: fail with a clear message
        if (!ecmReferenceNumberText) {
            Logger.error(`ECM reference number not found in table: ${number}`);
            throw new Error(`ECM Reference Number not found for ECM Number ${number}`);
        }
        return ecmReferenceNumberText;
    }

    /**
     * Verifies the ECM details shown after clicking the ECM hyperlink.
     * Uses web-first assertions so Playwright retries until the page has loaded.
     *
     * @param ecmNumber ECM reference number expected on the page.
     * @param courierRegistrationNumber Courier registration number expected on the page.
     */

    async verifyECMDetails(ecmNumber: string): Promise<void> {

        const courierRegistrationNumber = ecmDocFilingData.detailsOfAuthorizedCourierData.courierRegistrationNumber;
        Logger.info(`Verifying ECM details -> ECM No.: ${ecmNumber}, Courier Registration No.: ${courierRegistrationNumber}`);

        // Courier registration number
        const registrationNumber = this.page.getByText(courierRegistrationNumber);
        await expect(registrationNumber).toBeVisible();
        Logger.info(`Courier registration number verified: ${courierRegistrationNumber}`);

        // ECM reference number
        const ecmReferenceNumber = this.page.getByText(ecmNumber, { exact: true });
        await expect(ecmReferenceNumber).toBeVisible();
        await expect(ecmReferenceNumber).toHaveText(ecmNumber);
        Logger.info(`ECM reference number verified: ${ecmNumber}`);
    }
}