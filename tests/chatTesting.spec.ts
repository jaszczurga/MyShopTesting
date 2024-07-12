import {test,expect} from "../test-fixture";


test.describe('tests related to chat functionality',() => {
    test('001 given chat icon when click then open chat window', async({userPage}) => {
        await userPage.accessMainPage().goto()

        if(await userPage.accessMainPage().userChat.chatWindow.isVisible()){
            await userPage.accessMainPage().userChat.closeButton.click()
            expect(await userPage.accessMainPage().userChat.chatWindow.isVisible()).toBeFalsy()
        }else{
            await userPage.accessMainPage().chatIconButton.click()
            await expect(await userPage.accessMainPage().userChat.chatWindow).toBeVisible()
        }
    })

    test('002 given user chat when send message to manager then show message in chat with user', async({userPage,adminPage}) => {
        await userPage.accessMainPage().goto()
        await adminPage.accessMainPage().goto()
        await adminPage.accessMainPage().chatButton.click()

        const message = "messs"

        await userPage.accessMainPage().chatIconButton.click()
        await userPage.accessMainPage().userChat.messageInput.fill(message)
        await userPage.accessMainPage().userChat.sendButton.click()

        await adminPage.accessAdminChat().usersPanel.getByText(process.env.USER_EMAIL).click()
        await adminPage.page.waitForTimeout(5)
        const isMessageDelivered = await adminPage.accessAdminChat().adminChat.chatWindow.getByText(message).last().isVisible()
        expect(isMessageDelivered).toBeTruthy()
    })
})