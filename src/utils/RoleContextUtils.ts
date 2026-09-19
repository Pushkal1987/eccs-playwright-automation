import {Browser, BrowserContext, Page} from '@playwright/test';
import { PageObjectsManager } from "../managers/PageObjectsManager";
import { UserRole, users } from "../config/users";
import { Logger } from "./LoggerUtils";


/*export type UserRole =
    | 'COURIER'
    | 'CUSTODIAN'
    | 'ACDC'
    | 'AO'
    | 'INSPECTOR';
*/
export class RoleContext {

    readonly role: UserRole;
    readonly context: BrowserContext;
    readonly page: Page;
    readonly pageObjectsManager: PageObjectsManager;    

    private constructor(role: UserRole, context: BrowserContext, page: Page) {
        this.role = role;
        this.context = context;
        this.page = page;
        this.pageObjectsManager = new PageObjectsManager(this.page);
    }

    static async create(
        browser: Browser,
        role: UserRole
    ): Promise<RoleContext> {
        /*
        const storageStates: Record<UserRole, string> = {

            COURIER: '.auth/courier.json',
            CUSTODIAN: '.auth/custodian.json',
            ACDC: '.auth/acdc.json',
            AO: '.auth/ao.json',
            INSPECTOR: '.auth/inspector.json'
        };

        const storageState = storageStates[role];
        */
       const user = users[role];

        Logger.info('==========================================');
        Logger.info(`Creating Context`);
        Logger.info(`Role          : ${role}`);
        Logger.info(`Storage State : ${user.storageState}`);
        Logger.info('==========================================');

        const context = await browser.newContext({
            storageState: user.storageState
        });

        const page = await context.newPage();

        Logger.info(`Context Created : ${role}`);
        Logger.info(`Page Created    : ${role}`);

        return new RoleContext(role, context, page);
    }

    // Use this method to close the context and page when done. This is important to free up resources and avoid memory leaks.
    /*
    async close(): Promise<void> {
        await this.context.close();

        Logger.info(
            `Role Context Closed : ${this.page.url()}`
        );
    }
    */
}