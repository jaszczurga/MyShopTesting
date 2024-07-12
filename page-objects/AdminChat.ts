import {Locator, Page} from "@playwright/test";


export class AdminChatPage{
    readonly page: Page;

    readonly usersPanel: Locator
    readonly adminChat:AdminChat


    constructor(page:Page) {
        this.usersPanel = page.getByTestId('usersPanel')
        this.adminChat = {
            chatWindow: page.getByTestId('chatPanel'),
            sendButton: page.getByRole('button', { name: 'Send' }),
            messageInput: page.getByPlaceholder('message'),
        }
    }

    async goto(){
        await this.page.goto('./live-chat')
    }
}

interface AdminChat {
    chatWindow: Locator
    sendButton: Locator
    messageInput: Locator
}