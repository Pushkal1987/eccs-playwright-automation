import {Browser, BrowserContext, Page} from '@playwright/test';

export type UserRole =
    | 'COURIER'
    | 'CUSTODIAN'
    | 'ACDC'
    | 'AO'
    | 'INSPECTOR';

export class RoleContext {

    static async create(
        browser: Browser,
        role: UserRole
    ): Promise<{
        context: BrowserContext;
        page: Page;
    }> {

        const storageStates: Record<UserRole, string> = {

            COURIER: 'auth/courier.json',

            CUSTODIAN: 'auth/custodian.json',

            ACDC: 'auth/acdc.json',

            AO: 'auth/ao.json',

            INSPECTOR: 'auth/inspector.json'
        };

        const storageState = storageStates[role];

        console.log('==========================================');
        console.log(`Creating Context`);
        console.log(`Role          : ${role}`);
        console.log(`Storage State : ${storageState}`);
        console.log('==========================================');

        const context = await browser.newContext({
            storageState
        });

        const page = await context.newPage();

        console.log(`Context Created : ${role}`);
        console.log(`Page Created    : ${page.url()}`);

        return {
            context,
            page
        };
    }
}