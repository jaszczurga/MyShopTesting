import {Locator, Page} from "@playwright/test";
import {getRawAsset} from "node:sea";


export class MainPage{
    readonly page: Page;
    readonly cartButton: Locator
    readonly myProductsButton: Locator
    readonly ordersButton: Locator
    readonly chatButton: Locator
    readonly chatIconButton: Locator
    readonly authLoginButtonText: Locator
    readonly authLogoutButtonText: Locator
    readonly userChat: UserChat


    constructor(page:Page) {
        this.page = page;
        this.cartButton =  page.locator('.cart-link')
        this.myProductsButton =  page.getByRole('link', { name: 'MyProducts' })
        this.ordersButton =  page.getByRole('link', { name: 'Orders' })
        this.chatButton =  page.getByRole('link', { name: 'chat' })
        this.chatIconButton =  page.locator('.chat-icon')
        this.authLoginButtonText =  page.getByTestId('authLoginButtonTestId')
        this.authLogoutButtonText =  page.getByTestId('authLogoutButtonTestId')
        this.userChat = {
            chatWindow: page.locator('[class="chat-container show-chat"]'),
            sendButton: page.getByRole('button', { name: 'Send' }),
            messageInput: page.getByPlaceholder('message'),
            closeButton: page.locator('.close-button')
        }
    }

    async goto(){
        await this.page.goto('/')
    }

}

interface UserChat {
    chatWindow: Locator
    sendButton: Locator
    messageInput: Locator
    closeButton: Locator
}