import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { HomePage } from "../../HomePage";
import { menuSelectionData } from '../../../test-data/courier/menuSelectionData';
import { printECMData } from '../../../test-data/courier/printECMData';
import { Logger } from '../../../utils/LoggerUtils';

export class PrintECM_page extends BasePage {

    // Page Objects
    private readonly homePage: HomePage;

    // Menu Selection
    private readonly mainMenu: string = menuSelectionData.printECM_MenuSelectionData.mainMenu;
    private readonly subMenu: string = menuSelectionData.printECM_MenuSelectionData.subMenu;

    // Page Locators
    private readonly searchHeading: Locator;
    private readonly fromDateInput: Locator;
    private readonly toDateInput: Locator;
    private readonly airlinesDropdown?: Locator;
    private readonly flightNumberDropdown?: Locator;
    private readonly ecmReferenceNumberInput?: Locator;
    private readonly searchButton: Locator;
    private readonly resetButton: Locator;

    private readonly tableBody: Locator;

    // Constructor
    constructor(page: Page) {
        super(page);

        this.homePage = new HomePage(page);

        this.searchHeading = page.getByText('SEARCH CRITERION');
        this.fromDateInput = page.getByRole('textbox').first();
        this.toDateInput = page.getByRole('textbox').nth(1);
        this.airlinesDropdown = page.getByRole('combobox').first();
        this.flightNumberDropdown = page.getByRole('combobox').last();
        this.ecmReferenceNumberInput = page.getByRole('textbox').last();
        this.searchButton = page.locator('a[href*="getECMList.do"]');
        this.resetButton = page.getByAltText('Clear');

        this.tableBody = page.locator("//table[3]//tbody");
    }

    // Methods

    async selectMenu(): Promise<void> {
        Logger.info(`Selecting Menu: ${this.mainMenu} > ${this.subMenu}.`);
        await this.homePage.selectMenu(this.mainMenu, this.subMenu);
        await expect(this.searchHeading).toContainText('SEARCH CRITERION');
    }

    async enterFromDate(): Promise<void> {
        Logger.info(`Entering From Date ${printECMData.fromDate}.`);
        await this.fill(this.fromDateInput, printECMData.fromDate);
    }

    async enterToDate(): Promise<void> {
        Logger.info(`Entering To Date ${printECMData.toDate}`);
        await this.fill(this.toDateInput, printECMData.toDate);
    }

    async selectAirlines(): Promise<void> {
        Logger.info(`Selecting Airlines: ${printECMData.airlines}`);

        if (!this.airlinesDropdown) {
            Logger.warn('Airlines is not available.');
            return;
        } else {
            await this.selectOption(this.airlinesDropdown, printECMData.airlines);
            Logger.success(`Airlines ${printECMData.airlines} selected successfully.`);
        }
    }

    async selectFlightNumber(): Promise<void> {
        Logger.info(`Selecting Flight Number: ${printECMData.flightNumber}`);

        if (!this.flightNumberDropdown) {
            Logger.warn(`Flight Number is not available`);
            return;
        } else {
            await this.selectOption(this.flightNumberDropdown, printECMData.flightNumber);
            Logger.success(`Flight Number ${printECMData.flightNumber} selected successfully.`);
        }
    }

    async enterECMReferenceNumber(ecmNumber: any): Promise<void> {
        Logger.info(`Entering ECM Reference Number: ${ecmNumber}`);

        if (!this.ecmReferenceNumberInput) {
            Logger.warn(`ECM Reference Number is not available`);
            return;

        } else {
            await this.fill(this.ecmReferenceNumberInput, ecmNumber);
            Logger.success(`ECM Reference Number: ${ecmNumber} entered successfully`)
        }
    }

    async clickSearch(): Promise<void> {
        Logger.info(`Clicking on Search button`);
        await this.click(this.searchButton);
    }

    async clickReset(): Promise<void> {
        Logger.info(`Clicking on Reset button`);
        await this.click(this.resetButton);
        await expect(this.tableBody).toBeVisible();
    }
    /*
        private async getECMStatusLegacy(ecmNumber: string): Promise<string> {
            Logger.info(`Checking ECM Status for ${ecmNumber}`);
    
            const rows = this.tableBody.locator('tr');
            const rowCount = await rows.count();
    
            for (let i = 0; i < rowCount; i++) {
                const row = rows.nth(i);
    
                const ecmText = await row.locator('td:nth-child(2)').textContent();
    
                if (ecmText?.trim() === ecmNumber) {
                    const status = await row.locator('td:nth-child(5)').textContent();
    
                    Logger.info(`ECM Number: ${ecmNumber} Status: ${status}`);
                    return status?.trim() ?? '';
                }
            }
            await this.page.waitForFunction(
                (number) => {
                    const row = Array.from(document.querySelectorAll('tr')).find((candidate) =>
                        Array.from(candidate.cells).some((cell) => cell.textContent?.trim() === number),
                    );
                    return Boolean(row?.cells[4]?.textContent?.trim());
                },
                ecmNumber,
                { timeout: 10000 },
            );
            return this.getECMStatus(ecmNumber);
        }
    
        async getECMStatus(ecmNumber: any): Promise<string> {
    
            Logger.info(`Checking ECM Status for ECM Number: ${ecmNumber}`);
    
            if (!ecmNumber?.trim()) {
                throw new Error('ECM Number is null or empty');
            }
            await this.page.waitForFunction(
                (number) => {
                    const row = Array.from(document.querySelectorAll('tr')).find((candidate) =>
                        Array.from(candidate.cells).some((cell) => cell.textContent?.trim() === number),
                    );
                    return Boolean(row?.cells[4]?.textContent?.trim());
                },
                ecmNumber,
                { timeout: 10000 },
            );
    
            const row = this.page.locator('tr').filter({ hasText: ecmNumber }).first();
            
            const status = (await row.locator('td').nth(4).innerText()).trim();
            
            if (!status) {
                throw new Error(`Status is empty for ECM Number ${ecmNumber}`);
            }
    
            Logger.info(`ECM Number: ${ecmNumber} status is "${status}"`);
            return status;
        }
            */

    async getECMStatus(ecmNumber: string): Promise<string> {
        const number = ecmNumber?.trim();

        if (!number) {
            throw new Error('ECM Number: ${number} is not available');
        }

        Logger.info(`Checking ECM status for ${number}`);

        // Wait until the table body is visible.
        await expect(this.tableBody).toBeVisible();

        const rows = this.tableBody.locator('tr');

        // Wait until at least one row is visible.
        await expect(rows.first()).toBeVisible();

        const rowCount = await rows.count();
        let status = '';

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const ecmText = (await row.locator('td').nth(1).innerText()).trim();

            if (ecmText === number) {
                status = (await row.locator('td').nth(4).innerText()).trim();
                break; // Stop once the matching ECM row is found.
            }
        }

        if (!status) {
            throw new Error(`Status not found for ECM Number ${number}`);
        }

        Logger.info(`ECM Number: ${number} status is "${status}"`);
        return status;
    }

    async printECM(ecmNumber: string | null): Promise<void> {
        Logger.info(`Print ECM started for ECM: ${ecmNumber}`);

        await this.selectMenu();
        await this.enterFromDate();
        await this.enterToDate();
        await this.selectAirlines();
        await this.selectFlightNumber();
        await this.enterECMReferenceNumber(ecmNumber);
        await this.clickSearch();
    }

}