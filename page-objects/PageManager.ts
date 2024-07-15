import {Page} from "@playwright/test";
import {MainPage} from "./MainPage";
import {AdminChatPage} from "./AdminChatPage";
import {AdminCategories} from "./AdminCategories";
import {AdminProducts} from "./AdminProducts";
import {ProductDetailPage} from "./ProductDetailPage";
import {CartPage} from "./CartPage";


export class PageManager{

    public readonly page: Page
    private _mainPage: MainPage
    private _adminChatPage: AdminChatPage
    private _adminCategories: AdminCategories
    private _adminProducts: AdminProducts
    private _ProductDetailPage: ProductDetailPage
    private _CartPage: CartPage

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

    accessAdminCategories(): AdminCategories {
        if (!this._adminCategories) {
            this._adminCategories = new AdminCategories(this.page);
        }
        return this._adminCategories;
    }

    accessAdminProducts(): AdminProducts {
        if (!this._adminProducts) {
            this._adminProducts = new AdminProducts(this.page);
        }
        return this._adminProducts;
    }

    accessProductDetailPage(): ProductDetailPage {
        if (!this._ProductDetailPage) {
            this._ProductDetailPage = new ProductDetailPage(this.page);
        }
        return this._ProductDetailPage;
    }

    accessCartPage(): CartPage {
        if (!this._CartPage) {
            this._CartPage = new CartPage(this.page);
        }
        return this._CartPage;
    }


}