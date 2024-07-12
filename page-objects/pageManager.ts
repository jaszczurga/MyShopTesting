import {Page} from "@playwright/test";
import {MainPage} from "./MainPage";
import {AdminChatPage} from "./AdminChat";


export class PageManager{

    public readonly page: Page
    private _mainPage: MainPage
    private _adminChatPage: AdminChatPage

    constructor(page: Page) {
        this.page = page;
    }

    accessMainPage(): MainPage {
        if (!this._mainPage) {
            this._mainPage = new MainPage(this.page);
        }
        return this._mainPage;
    }

    accessAdminChat(): AdminChatPage {
        if (!this._adminChatPage) {
            this._adminChatPage = new AdminChatPage(this.page);
        }
        return this._adminChatPage;
    }

}