
import { test as base, type Page, type Locator } from '@playwright/test';
import {PageManager} from "./page-objects/pageManager";

type MyFixtures = {
    adminPage: PageManager
    userPage: PageManager

};



export const test = base.extend<MyFixtures>({
    adminPage: async ({browser},use) => {
        const context = await browser.newContext({ storageState: '../.auth/admin.json' });
        const adminPage = new PageManager(await context.newPage());
        await use(adminPage);
        await context.close();
    },
    userPage: async ({browser},use) => {
        const context = await browser.newContext({ storageState: '../.auth/user.json' });
        const adminPage = new PageManager(await context.newPage());
        await use(adminPage);
        await context.close();
    }
})