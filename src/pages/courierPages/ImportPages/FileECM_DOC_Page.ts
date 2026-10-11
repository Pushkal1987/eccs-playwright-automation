import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { HomePage } from '../../HomePage';
import { menuSelectionData } from '../../../test-data/courier/menuSelectionData';
import { ecmDocFilingData } from '../../../test-data/courier/ecmDocFilingData';
import { Logger } from '../../../utils/LoggerUtils';
import { DateUtils } from '../../../utils/DateUtils';

export class FileECM_DOC_Page extends BasePage {

    private readonly homePage: HomePage;

    // Menu Selection
    private readonly mainMenu: string = menuSelectionData.ecmDocFiling_MenuSelectionData.mainMenu;
    private readonly subMenu: string = menuSelectionData.ecmDocFiling_MenuSelectionData.subMenu;
    private readonly subSubMenu: string = menuSelectionData.ecmDocFiling_MenuSelectionData.subSubMenu;

    private readonly freshECMLink: Locator;
    private readonly listOfIncompleteECMLink: Locator;

    private readonly ecmDocumentHeading: Locator;

    // Details of Authorized Courier
    private readonly courierRegistrationNumber: Locator;
    private readonly nameOfAuthorisedCourier: Locator;

    // Details of On Board Courier (If Applicable)
    private readonly nameOfTheOnboardCourierInput: Locator;
    private readonly onBoardCourierAddress1Input: Locator;
    private readonly onBoardCourierAddress2Input: Locator;
    private readonly onBoardCourierCityInput: Locator;
    private readonly onBoardCourierPostalCodeInput: Locator;
    private readonly onBoardCourierStateInput: Locator;
    private readonly onBoardCourierCountryDropdown: Locator;

    // Flight Details
    private readonly airlinesDropdown: Locator;
    private readonly flightNumberDropdown: Locator;
    private readonly airportOfArrival: Locator;
    private readonly airpotOfShipmentDropdown: Locator;
    private readonly dateOfArrivalInput: Locator;
    private readonly timeOfArrivalInput: Locator;

    // Details of Items Imported
    private readonly mawbNumberInput: Locator;

    // HAWB Details
    private readonly hawbNumberInput: Locator;
    private readonly caseOfCRNDropdown: Locator;
    private readonly numberOfPackagesInput: Locator;
    private readonly weightInput: Locator;
    private readonly descriptionOfGoodsInput: Locator;

    // Details of Consignor
    private readonly nameOfTheConsignorInput: Locator;
    private readonly consignorAddress1Input: Locator;
    private readonly consignorAddress2Input: Locator;
    private readonly consignorCityInput: Locator;
    private readonly consignorPostalCodeInput: Locator;
    private readonly consignorStateInput: Locator;
    private readonly consignorCountryDropdown: Locator;

    // Details of Consignee
    private readonly nameOfTheConsigneeInput: Locator;
    private readonly consigneeAddress1Input: Locator;
    private readonly consigneeAddress2Input: Locator;
    private readonly consigneeCityInput: Locator;
    private readonly consigneePostalCodeInput: Locator;
    private readonly consigneeStateInput: Locator;
    private readonly consigneeCountryDropdown: Locator;

    // Shipment Value
    private readonly valueInput: Locator;
    private readonly currencyDropdown: Locator;
    private readonly shipmentToBeTransShippedDropdown: Locator;
    private readonly placeOfTransShipmentDropdown: Locator;

    // Multi Part Shipment (MPS) Details
    private readonly crnNumberInput: Locator;

    private readonly addCRNButton: Locator;
    private readonly addHAWBButton: Locator;
    private readonly addMAWBButton: Locator;
    private readonly cancelButton: Locator;
    private readonly resetButton: Locator;
    private readonly saveAndContinueButton: Locator;
    private readonly submitButton: Locator;

    private readonly detailsOFItemsImportedText: Locator;
    //private readonly addedMAWBNumber: Locator;
    //private readonly addedHAWBNumber: Locator;
    //private readonly numberOfPackage: Locator;
    //private readonly addedHAWBValue: Locator;


    private readonly successMessage: Locator;

    private readonly flightAlreadyInitiatedErrorMsg: Locator;


    constructor(page: Page) {
        super(page);

        this.homePage = new HomePage(page);

        this.freshECMLink = page.getByRole('link', { name: 'Fresh ECM' });

        this.listOfIncompleteECMLink = page.getByRole('link', {
            name: 'List of Incomplete ECM'
        });

        this.ecmDocumentHeading = page.getByRole('cell', {
            name: 'Express Cargo Manifest (ECM) Document [See Regulation 5]',
            exact: true
        });

        // DETAILS OF AUTHORIZED COURIER
        this.courierRegistrationNumber = page.getByRole('cell', {
            name: ecmDocFilingData.detailsOfAuthorizedCourierData.courierRegistrationNumber,
            exact: true
        });

        this.nameOfAuthorisedCourier = page.getByRole('cell', {
            name: ecmDocFilingData.detailsOfAuthorizedCourierData.nameOfTheAuthorizedCourier,
            exact: true
        });

        // DETAILS OF ON BOARD COURIER(if Applicable)
        this.nameOfTheOnboardCourierInput = page.locator('input[name="obCourierName"]');
        this.onBoardCourierAddress1Input = page.locator('input[name="obCourierAddress1"]');
        this.onBoardCourierAddress2Input = page.locator('input[name="obCourierAddress2"]');
        this.onBoardCourierCityInput = page.locator('input[name="obCourierCity"]');
        this.onBoardCourierStateInput = page.locator('input[name="obCourierState"]');
        this.onBoardCourierPostalCodeInput = page.locator('input[name="obCourierZip"]');
        this.onBoardCourierCountryDropdown = page.locator('select[name="obCourierCountry"]');

        // FLIGHT DETAILS
        this.airlinesDropdown = page.locator('select[name="airLinesName"]');
        this.flightNumberDropdown = page.locator('select[name="flightNumber"]');
        this.airportOfArrival = page.getByRole('cell', { name: 'AMT', exact: true });
        this.airpotOfShipmentDropdown = page.locator('select[name="shipmentAirport"]');
        this.dateOfArrivalInput = page.locator('input[name="arrivalDate"]');
        this.timeOfArrivalInput = page.locator('input[name="arrivalTime"]');

        // MAWB DETAILS (DETAILS OF ITEMS IMPORTED)
        this.mawbNumberInput = page.locator('input[name="mawbNumber"]');

        // HAWB DETAILS
        this.hawbNumberInput = page.locator('input[name="hawbNumber"]');
        this.caseOfCRNDropdown = page.locator('select[name="crnType"]');
        this.numberOfPackagesInput = page.locator('input[name="packageCount"]');
        this.weightInput = page.locator('input[name="packageWeight"]');
        this.descriptionOfGoodsInput = page.locator('textarea[name="goodsDescription"]');

        // DETAILS OF CONSIGNOR
        this.nameOfTheConsignorInput = page.locator('input[name="consignorName"]');
        this.consignorAddress1Input = page.locator('input[name="consignorAddress1"]');
        this.consignorAddress2Input = page.locator('input[name="consignorAddress2"]');
        this.consignorCityInput = page.locator('input[name="consignorCity"]');
        this.consignorPostalCodeInput = page.locator('input[name="consignorZip"]');
        this.consignorStateInput = page.locator('input[name="consignorState"]');
        this.consignorCountryDropdown = page.locator('select[name="consignorCountry"]');

        // DETAILS OF CONSIGNEE
        this.nameOfTheConsigneeInput = page.locator('input[name="consigneeName"]');
        this.consigneeAddress1Input = page.locator('input[name="consigneeAddress1"]');
        this.consigneeAddress2Input = page.locator('input[name="consigneeAddress2"]');
        this.consigneeCityInput = page.locator('input[name="consigneeCity"]');
        this.consigneePostalCodeInput = page.locator('input[name="consigneeZip"]');
        this.consigneeStateInput = page.locator('input[name="consigneeState"]');
        this.consigneeCountryDropdown = page.locator('select[name="consigneeCountry"]');

        // Shipment Value
        this.valueInput = page.locator('input[name="hawbValue"]');
        this.currencyDropdown = page.locator('select[name="currency"]');
        this.shipmentToBeTransShippedDropdown = page.locator('select[name="transhipOpt"]');
        this.placeOfTransShipmentDropdown = page.locator('select[name="transhipDest"]');

        // MULTI PART SHIPMENT (MPS) DETAILS
        this.crnNumberInput = page.locator('input[name="crnNumber"]');
        this.addCRNButton = page.locator('a[href*="addCRNf.do"]');
        this.addHAWBButton = page.locator('a[href*="addHAWBf.do"]');
        this.addMAWBButton = page.locator('a[href*="addMAWBf.do"]');
        this.cancelButton = page.getByRole('link').filter({ hasText: /^$/ }).nth(3);
        this.resetButton = page.getByRole('link').filter({ hasText: /^$/ }).nth(4);
        this.saveAndContinueButton = page.getByRole('link').filter({ hasText: /^$/ }).nth(5);
        this.submitButton = page.locator('a[href*="createECM.do"]');

        this.detailsOFItemsImportedText = page.getByText('DETAILS OF ITEMS IMPORTED:');

        this.flightAlreadyInitiatedErrorMsg = page.getByText('Filing of ECM for this flight');


        // Success Message
        this.successMessage = page.getByText('ECM Filed Successfully, ECM');
    }

    // ********************** Methods **********************

    async selectMenu(): Promise<void> {
        Logger.info(`Selecting Menu: ${this.mainMenu} > ${this.subMenu} > ${this.subSubMenu}`);
        await this.homePage.selectMenu(this.mainMenu, this.subMenu, this.subSubMenu);
    }

    async clickFreshECMLink(): Promise<void> {
        Logger.info('Clicking on Fresh ECM Link');
        await this.click(this.freshECMLink);
    }

    async clickListOfIncompleteECMLink(): Promise<void> {
        Logger.info('Clicking on List of Incomplete ECM Link');
        await this.click(this.listOfIncompleteECMLink);
    }

    // DETAILS OF AUTHORIZED COURIER
    async getCourierRegistrationNumber(): Promise<string> {
        Logger.info(`Getting Courier Registration Number`);
        const regNo = await this.getText(this.courierRegistrationNumber);
        Logger.info(`Courier Registration Number: ${regNo}`);
        return regNo;
    }

    async getNameOfAuthorisedCourier(): Promise<string> {
        Logger.info(`Getting Name of Authorised Courier`);
        const name = await this.getText(this.nameOfAuthorisedCourier);
        Logger.info(`Name of Authorised Courier: ${name}`);
        return name;
    }

    // Validate Details of Authorized Courier
    async validateDeatailsOfAuthorizedCourier(): Promise<void> {

        Logger.info('Validating Authorized Courier details');

        const data = ecmDocFilingData.detailsOfAuthorizedCourierData;

        const courierRegNum: string = data.courierRegistrationNumber;
        const nameOfAuthoCourier: string = data.nameOfTheAuthorizedCourier;

        await expect(this.courierRegistrationNumber).toHaveText(courierRegNum);
        Logger.info(`Courier Registration Number: "${courierRegNum}" validated successfully.`);

        await expect(this.nameOfAuthorisedCourier).toHaveText(nameOfAuthoCourier)
        Logger.info(`Name of Authorized Courier: "${nameOfAuthoCourier}" validated successfully.`)
    }

    // DETAILS OF ON BOARD COURIER(if Applicable)
    async enterDetailsOfOnboardCourier(): Promise<void> {

        Logger.info('Entering On Board Courier details');

        const data = ecmDocFilingData.detailsOfOnboardCourierData;

        const courierName: string = data.nameOfTheOnBoardCourier;
        const address1: string = data.address1;
        const address2: string = data.address2;
        const city: string = data.city;
        const postalCode = data.postalCode;
        const state: string = data.state;
        const country: string = data.country;

        Logger.info(`Name of the On Board Courier: ${courierName}`)
        await this.fill(this.nameOfTheOnboardCourierInput, courierName);

        Logger.info(`Entering Address 1: ${address1}`);
        await this.fill(this.onBoardCourierAddress1Input, address1);

        Logger.info(`Entering Address 2: ${address2}`);
        await this.fill(this.onBoardCourierAddress2Input, address2);

        Logger.info(`Entering City: ${city}`);
        await this.fill(this.onBoardCourierCityInput, city);

        Logger.info(`Entering Postal/Zip Code: ${postalCode}`);
        await this.fill(this.onBoardCourierPostalCodeInput, postalCode);

        Logger.info(`Entering State: ${state}`);
        await this.fill(this.onBoardCourierStateInput, state);

        Logger.info(`Selecting Country: ${country}`);
        await this.selectOption(this.onBoardCourierCountryDropdown, country);

        Logger.success('On Board Courier details entered successfully');
    }

    // FLIGHT DETAILS
    async enterFlightDetails(): Promise<void> {

        Logger.info('Entering Flight Details');

        const data = ecmDocFilingData.flightDetailsData

        const airline: string = data.airlines;
        const flightNumber: string = data.flightNumber;
        const airportOfShipment: string = data.airportOfShipment;
        const dateOfArrival: string = data.dateOfArrival;
        const timeOfArrival: string = data.timeOfArrival;

        Logger.info(`Selecting Airline: ${airline}`);
        await this.selectOption(this.airlinesDropdown, airline);

        Logger.info(`Selecting Flight Number: ${flightNumber}`);
        await this.selectOption(this.flightNumberDropdown, flightNumber);

        Logger.info(`Selecting Airport of Shipment: ${airportOfShipment}`);
        await this.selectOption(this.airpotOfShipmentDropdown, airportOfShipment);

        Logger.info(`Entering Date of Arrival: ${dateOfArrival}`);
        await this.fill(this.dateOfArrivalInput, dateOfArrival);

        Logger.info(`Entering Time of Arrival: ${timeOfArrival}`);
        await this.fill(this.timeOfArrivalInput, timeOfArrival);

        Logger.success('Flight details entered successfully');
    }

    // DETAILS OF ITEMS IMPORTED
    async enterMawbNumber(): Promise<void> {

        const mawbNumber: string = DateUtils.getCurrentTimestamp();

        Logger.info(`Entering MAWB Number: ${mawbNumber}`);
        await this.fill(this.mawbNumberInput, mawbNumber);
    }

    // HAWB Details
    async enterHawbDetails(): Promise<void> {

        Logger.info('Entering HAWB Details');

        const data = ecmDocFilingData.hawbDetailsData;

        const hawbNumber: string = data.hawbNumber;
        const caseOfCRN: string = data.caseOfCRN;
        const numberOfPackages: string = data.numberOfPackages;
        const weight: string = data.weight;
        const descriptionOfGoods: string = data.descriptionOfGoods;

        Logger.info(`Entering HAWB Number: ${hawbNumber}`);
        await this.fill(this.hawbNumberInput, hawbNumber);

        Logger.info(`Selecting Case Of CRN:${caseOfCRN}`);
        await this.selectOption(this.caseOfCRNDropdown, caseOfCRN);

        Logger.info(`Entering Number of Packages / Pieces / Bags / ULD: ${numberOfPackages}`);
        await this.fill(this.numberOfPackagesInput, numberOfPackages);

        Logger.info(`Entering Weight (in Kg.): ${weight}`);
        await this.fill(this.weightInput, weight);

        Logger.info(`Entering Description of Goods: ${descriptionOfGoods}`);
        await this.fill(this.descriptionOfGoodsInput, descriptionOfGoods);

        Logger.success('HAWB details entered successfully');
    }

    // DETAILS OF CONSIGNOR
    async enterDetailsOfConsignor(): Promise<void> {

        Logger.info('Entering Consignor Details');

        const data = ecmDocFilingData.detailsOfConsignorData;

        const nameOfConsignor: string = data.nameOfTheConsignor;
        const address1: string = data.address1;
        const address2: string = data.address2;
        const city: string = data.city;
        const postalCode: string = data.postalCode;
        const state: string = data.state;
        const country: string = data.country;

        Logger.info(`Entering Name of the Consignor: ${nameOfConsignor}`);
        await this.fill(this.nameOfTheConsignorInput, nameOfConsignor);

        Logger.info(`Entering Consignor Address 1: ${address1}`);
        await this.fill(this.consignorAddress1Input, address1);

        Logger.info(`Entering Consignor Address 2: ${address2}`);
        await this.fill(this.consignorAddress2Input, address2);

        Logger.info(`Entering Consignor City: ${city}`);
        await this.fill(this.consignorCityInput, city);

        Logger.info(`Entering Consignor Postal/Zip Code: ${postalCode}`);
        await this.fill(this.consignorPostalCodeInput, postalCode);

        Logger.info(`Entering Consignor State: ${state}`);
        await this.fill(this.consignorStateInput, state);

        Logger.info(`Selecting Consignor Country: ${country}`);
        await this.selectOption(this.consignorCountryDropdown, country);

        Logger.success('Consignor details entered successfully');
    }

    // DETAILS OF CONSIGNEE
    async enterDetailsOfConsignee(): Promise<void> {

        Logger.info('Entering Details of Consignee');

        const data = ecmDocFilingData.detailsOfConsigneeData;

        const nameOfConsignee: string = data.nameOfTheConsignee;
        const address1: string = data.address1;
        const address2: string = data.address2;
        const city: string = data.city;
        const postalCode: string = data.postalCode;
        const state: string = data.state;
        const country: string = data.country;

        Logger.info(`Entering Name of the Consignee: ${nameOfConsignee}`);
        await this.fill(this.nameOfTheConsigneeInput, nameOfConsignee);

        Logger.info(`Entering Consignee Address 1: ${address1}`);
        await this.fill(this.consigneeAddress1Input, address1);

        Logger.info(`Entering Consignee Address 2: ${address2}`);
        await this.fill(this.consigneeAddress2Input, address2);

        Logger.info(`Entering Consignee City: ${city}`);
        await this.fill(this.consigneeCityInput, city);

        Logger.info(`Entering Consignee Postal/Zip Code: ${postalCode}`);
        await this.fill(this.consigneePostalCodeInput, postalCode);

        Logger.info(`Entering Consignee State: ${state}`);
        await this.fill(this.consigneeStateInput, state);

        Logger.info(`Selecting Consignee Country: ${country}`);
        await this.selectOption(this.consigneeCountryDropdown, country);

        Logger.success('Consignee details entered successfully');
    }

    // Value
    async enterValue(): Promise<void> {

        const value: string = ecmDocFilingData.value;

        Logger.info(`Entering Value: ${value}`);
        await this.fill(this.valueInput, value);
    }

    // Currency 
    async selectCUrrency(): Promise<void> {

        const currency: string = ecmDocFilingData.currency;

        Logger.info(`Selecting Currency: ${currency}`);
        await this.selectOption(this.currencyDropdown, currency);
    }

    // Shipment to be Trans-shipped, Place of Trans-shipment
    async selectShipmentToBeTransShipped(): Promise<void> {

        const shipmentOption: string = ecmDocFilingData.shipmentToBeTransShipped;
        const place: string = ecmDocFilingData.placeOfTransShipment;

        Logger.info(`Selecting Shipment to be Trans-shipped: ${shipmentOption}`);
        await this.selectOption(this.shipmentToBeTransShippedDropdown, shipmentOption);

        if (shipmentOption.toUpperCase() === 'YES') {
            Logger.info(`Selecting Place of Trans-shipment: ${place}`);
            await this.selectOption(this.placeOfTransShipmentDropdown, place);
        }
    }

    // MULTI PART SHIPMENT (MPS) DETAILS
    async enterCRNNumberAndAddCRN(): Promise<void> {

        const caseOfCRN = ecmDocFilingData.hawbDetailsData.caseOfCRN;
        const numberOfPackage: number = Number(ecmDocFilingData.hawbDetailsData.numberOfPackages);

        if (caseOfCRN.toUpperCase() === 'YES') {

            if (numberOfPackage > 1) {

                for (let i = 0; i < numberOfPackage-1; i++) {

                    const crnNumber: string = `CRN${DateUtils.getCurrentTimestamp()}`;

                    Logger.info(`Entering CRN Number: ${crnNumber} `);
                    await this.fill(this.crnNumberInput, crnNumber);

                    // ADD CRN button 
                    Logger.info('Clicking on ADD CRN button');
                    await this.click(this.page.locator('a[href*="addCRNf.do"]'));

                    // Validate CRN is added
                    await expect(this.page.getByRole('cell', { name: crnNumber, exact: true })).toBeVisible();
                    Logger.success(`Added CRN: ${crnNumber} validated successfully.`)
                }
            }
        }
    }

    // ADD HAWB button
    async clickADDHAWB(): Promise<void> {
        Logger.info('Clicking on ADD HAWB button');
        await this.click(this.addHAWBButton);
    }

    // ADD MAWB button
    async clickADDMAWB(): Promise<void> {
        Logger.info('Clicking on ADD MAWB button');
        await this.click(this.addMAWBButton);
    }

    // CANCEL button
    async clickCancel(): Promise<void> {
        Logger.info('Clicking on Cancel button');
        await this.click(this.cancelButton);
    }

    // Reset button
    async clickReset(): Promise<void> {
        Logger.info('Clicking on Reset button');
        await this.click(this.resetButton);
    }

    //Save & Continue button
    async clickSaveAndContinue(): Promise<void> {
        Logger.info('Clicking on Save & Continue button');
        await this.click(this.saveAndContinueButton);
    }

    // Submit button
    async clickSubmit(): Promise<void> {
        Logger.info('Clicking on Submit button');
        await this.click(this.submitButton);
    }

    // Success message
    async getECMNumber(): Promise<string> {

        const successMessage: string | null = await this.getText(this.successMessage);

        Logger.info(`Success Message: ${successMessage}`);

        await expect(successMessage).toMatch(/ECM Filed Successfully/i);

        const ecmNumber: string | undefined = successMessage?.match(/ECM_AMT_\d{4}-\d{4}_\d+/i)?.[0];

        if (!ecmNumber) {
            throw new Error('ECM Reference Number not found');
        }

        Logger.info(`ECM Number is: ${ecmNumber}`);

        return ecmNumber;
    }

    // Fill Complete Form
    async fileFreshECMDocument(): Promise<string> {

        Logger.step('Starting Fresh ECM Document Filing');

        // Navigate through ECM Document filing menu.
        await this.selectMenu();
        await this.clickFreshECMLink();

        // Validate system-populated Authorized Courier details.
        await this.validateDeatailsOfAuthorizedCourier();

        // Enter Flight details.
        await this.enterFlightDetails();

        // Enter MAWB and HAWB details.
        await this.enterMawbNumber();
        await this.enterHawbDetails();

        // Enter Consignor and Consignee details.
        await this.enterDetailsOfConsignor();
        await this.enterDetailsOfConsignee();

        // Enter shipment value and currency.
        await this.enterValue();
        await this.selectCUrrency();

        // Select trans-shipment option.
        await this.selectShipmentToBeTransShipped();

        // Enter CRN Number.
        await this.enterCRNNumberAndAddCRN();

        // Add MAWB before submitting the document.
        await this.clickADDMAWB();

        // Verify that the imported-items section is available.
        await expect(this.detailsOFItemsImportedText).toBeVisible();

        // Submit the ECM document.
        await this.clickSubmit();

        // Wait for either successful filing or flight-already-initiated message.
        const result = await Promise.race([
            this.successMessage.waitFor({
                state: 'visible'
            }).then(() => 'SUCCESS'),

            this.flightAlreadyInitiatedErrorMsg.waitFor({
                state: 'visible'
            }).then(() => 'FLIGHT_ALREADY_INITIATED')
        ]);

        // Handle flight already initiated scenario.
        if (result === 'FLIGHT_ALREADY_INITIATED') {

            const errorMessage =
                await this.getText(this.flightAlreadyInitiatedErrorMsg);

            Logger.warn(`ECM filing was already initiated for this flight. Application message: ${errorMessage}`);
            throw new Error('No ECM number is available to check the filing status.');
        }

        const ecmNumber = await this.getECMNumber();

        Logger.success('ECM Number generated successfully.');
        Logger.success(`Fresh ECM Document filed successfully. ECM Number: ${ecmNumber}`);

        return ecmNumber;
    }
}