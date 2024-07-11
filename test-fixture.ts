import {MainPage} from "./page-objects/MainPage";
import { test as base, type Page, type Locator } from '@playwright/test';

type MyFixtures = {
    // adminPage: AdminPage;
    // userPage: UserPage;

};



export const test = base.extend<MyFixtures>({


})