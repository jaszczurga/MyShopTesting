
import { test as base, type Page, type Locator } from '@playwright/test';
import {PageManager} from "./page-objects/pageManager";



type MyFixtures = {
    adminPage: PageManager
    userPage: PageManager

};


export * from '@playwright/test';
export const test = base.extend<MyFixtures>({
    adminPage: async ({browser},use) => {
        const context = await browser.newContext({ storageState: './.auth/admin.json' });
        const adminPage = new PageManager(await context.newPage());
        await adminPage.accessMainPage().goto()
        await use(adminPage);
        await context.close();
    },
    userPage: async ({browser},use) => {
        const context = await browser.newContext({ storageState: './.auth/user.json' });
        const userPage = new PageManager(await context.newPage());
        await userPage.accessMainPage().goto()
        await use(userPage);
        await context.close();
    }
})