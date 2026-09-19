import { Page, test as setup, expect } from '@playwright/test'; //'../fixtures/BaseTest';

import { PageObjectsManager } from '../managers/PageObjectsManager';
import { users, UserRole } from '../config/users';
import { Logger } from '../utils/LoggerUtils'

const AUTH_TIMEOUT = 5 * 60 * 1000;

// Common authentication method
async function authenticateUser(
    page: Page,
    role: UserRole
): Promise<void> {

    const user = users[role];

    const pom = new PageObjectsManager(page);

    const basePage = pom.getBasePage();
    const loginPage = pom.getLoginPage();

    const roleName = role.toUpperCase();

    Logger.info(`========== ${roleName} LOGIN STARTED ==========`);

    // Navigate to ECCS
    await basePage.navigateTo('/eccs');

    // Username 
    await loginPage.enterUsername(user.username);
    
    // Password 
    await loginPage.enterPassword(user.password); 
    
    // Login 
    await loginPage.clickLoginButton();

    Logger.info(`Please enter OTP manually for ${roleName}`);

    // Validate successful login
    await expect(page.getByText('AVAILABLE WORK SUMMARY')).toBeVisible({ timeout: AUTH_TIMEOUT });

    //const eccsHeading = await headerPage.getECCSHeading();

    //await expect(eccsHeading).toContain('ECCS: Express Cargo Clearance System');

    Logger.success(`${roleName} login successful`);

    Logger.info(`Storage State Path: ${user.storageState}`);

    // Save authentication state
    await page.context().storageState({ path: user.storageState });

    Logger.info(`${roleName} authentication state saved: ${user.storageState}`);
}

// COURIER
setup(
    'Courier Login',
    async ({ page }) => {

        setup.setTimeout(AUTH_TIMEOUT);

        await authenticateUser(
            page,
            'COURIER'
        );
    }
);

/*
// CUSTODIAN
setup(
    'Custodian Login',
    async ({ page }) => {

        setup.setTimeout(AUTH_TIMEOUT);

        await authenticateUser(
            page,
            'custodian'
        );
    }
);

/*
// ACDC
setup(
    'ACDC Login',
    async ({ page }) => {

        setup.setTimeout(AUTH_TIMEOUT);

        await authenticateUser(
            page,
            'acdc'
        );
    }
);

// Appraiser
setup(
    'AO Login',
    async ({ page }) => {

        setup.setTimeout(AUTH_TIMEOUT);

        await authenticateUser(
            page,
            process.env.AO_USERNAME!,
            process.env.AO_PASSWORD!,
            'AO',
            AUTH_FILES.ao
        );
    }
);

// INSPECTOR
setup(
    'Inspector Login',
    async ({ page }) => {

        setup.setTimeout(AUTH_TIMEOUT);

        await authenticateUser(
            page,
            process.env.INSPECTOR_USERNAME!,
            process.env.INSPECTOR_PASSWORD!,
            'INSPECTOR',
            AUTH_FILES.inspector
        );
    }
);
*/



/*
if (!process.env.COURIER_USERNAME) {
    throw new Error(
        'COURIER_USERNAME is not loaded. Please check the .env file location and variable name.'
    );
}

if (!process.env.COURIER_PASSWORD) {
    throw new Error(
        'COURIER_PASSWORD is not loaded. Please check the .env file location and variable name.'
    );
}

const courierAuthFile = 'auth/user.json';
*/

