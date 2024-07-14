import {Page} from "@playwright/test";
import {MainPage} from "./MainPage";
import {AdminChatPage} from "./AdminChatPage";
import {AdminMyProductsPage} from "./AdminMyProductsPage";


export class PageManager{

    public readonly page: Page
    private _mainPage: MainPage
    private _adminChatPage: AdminChatPage
    private _adminMyProductsPage: AdminMyProductsPage

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

    accessAdminMyProductsPage(): AdminMyProductsPage {
        if (!this._adminMyProductsPage) {
            this._adminMyProductsPage = new AdminMyProductsPage(this.page);
        }
        return this._adminMyProductsPage;
    }

}