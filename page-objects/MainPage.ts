import {Page} from "@playwright/test";


export class MainPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}