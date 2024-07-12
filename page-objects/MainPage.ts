import {Locator, Page} from "@playwright/test";


export class MainPage{
    readonly page: Page;
    readonly cartButton: Locator
    readonly myProductsButton: Locator
    readonly ordersButton: Locator
    readonly chatButton: Locator
    readonly chatIconButton: Locator
    readonly authButtonText: Locator

    constructor(page:Page) {
        this.page = page;
        this.cartButton =  page.locator('.cart-link')
        this.myProductsButton =  page.getByRole('link', { name: 'MyProducts' })
        this.ordersButton =  page.getByRole('link', { name: 'Orders' })
        this.chatButton =  page.getByRole('link', { name: 'chat' })
        this.chatIconButton =  page.locator('.chat-icon')
        this.authButtonText =  page.getByTestId('authLoginButtonTestId')
    }

    async goto(){
        await this.page.goto('/')
    }
}