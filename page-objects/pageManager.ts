import {Page} from "@playwright/test";
import {MainPage} from "./MainPage";


export class PageManager{

    private readonly page: Page
    private readonly mainPage: MainPage

    constructor(page:Page) {
        this.page=page
        this.mainPage = new MainPage(this.page)
    }

    accessMainPage(){
        return this.mainPage;
    }


}