import {Locator, Page} from "@playwright/test";


export class AdminChatPage{
    readonly page: Page;

    readonly usersPanel: Locator
    readonly adminChat:AdminChatPanel
    readonly pageUrl = process.env.ADMIN_CHAT_URL


    constructor(page:Page) {
        this.page= page
        this.usersPanel = page.getByTestId('usersPanel')
        this.adminChat = {
            chatWindow: page.getByTestId('chatPanel'),
            sendButton: page.getByRole('button', { name: 'Send' }),
            messageInput: page.getByPlaceholder('message'),
        }
    }

    async goto(){
        await this.page.goto(this.pageUrl)
    }

}

interface AdminChatPanel {
    chatWindow: Locator
    sendButton: Locator
    messageInput: Locator
}

