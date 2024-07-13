import {test,expect} from "../test-fixture";
import {faker} from "@faker-js/faker";
import {addAbortSignal} from "node:stream";


test.describe('tests related to chat functionality',() => {
    test('001 given chat icon when click then open chat window',{tag:["@chat","@user"]} ,async({userPage}) => {
        await userPage.accessMainPage().goto()

        if(await userPage.accessMainPage().userChat.chatWindow.isVisible()){
            await userPage.accessMainPage().userChat.closeButton.click()
            expect(await userPage.accessMainPage().userChat.chatWindow.isVisible()).toBeFalsy()
        }else{
            await userPage.accessMainPage().chatIconButton.click()
            await expect(await userPage.accessMainPage().userChat.chatWindow).toBeVisible()
        }
    })

    test('002 given user chat when send message to manager then show message in chat with manager',{tag:["@chat","@user"]}, async({userPage,adminPage}) => {
        await adminPage.accessMainPage().chatButton.click()
        await adminPage.page.waitForURL(`**${adminPage.accessAdminChat().pageUrl}`,{timeout:5000});

        const message= faker.string.alpha({length:{min:10,max:20}})
        //const message = (Math.random() + 1).toString(36).substring(7);
        //const message = "message"

        await userPage.accessMainPage().chatIconButton.click()
        await userPage.accessMainPage().userChat.messageInput.fill(message)
        await userPage.accessMainPage().userChat.sendButton.click()

        await adminPage.accessAdminChat().usersPanel.getByText(process.env.USER_EMAIL).click()
        await adminPage.page.waitForSelector(`:has-text("${message}")`,{timeout:5000})
        const isMessageDelivered = await adminPage.accessAdminChat().adminChat.chatWindow.getByText(message).last().isVisible()
        expect(isMessageDelivered).toBeTruthy()
    })

    test('003 given manager chat when send message to user then show message in user chat', async({adminPage,userPage}) => {
        //click chat button as admin
        await adminPage.accessMainPage().chatButton.click()
        //click chat icon button as user
        await userPage.accessMainPage().chatIconButton.click()

        // choose user from user panel to which message will be sent
        await adminPage.accessAdminChat().usersPanel.getByText(process.env.USER_EMAIL).click()
        //write message in message box
        const message= faker.string.alpha({length:{min:10,max:20}})
        await adminPage.accessAdminChat().adminChat.messageInput.fill(message)
        //click send button
        await adminPage.accessAdminChat().adminChat.sendButton.click()

        //wait for message to be delivered
        await userPage.accessMainPage().page.waitForSelector(`:has-text("${message}")`,{timeout:5000})


        const isMessageDelivered = await userPage.accessMainPage().userChat.chatWindow.getByText(message).last().isVisible()
        expect(isMessageDelivered).toBeTruthy()
    })
})