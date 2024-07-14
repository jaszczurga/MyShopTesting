import {test,expect} from "../test-fixture";


test.describe('cart operations test suite',() => {
    test('given product card when clicked add to cart then product in cart', async({userPage}) => {
        await userPage.accessMainPage().productCardsList.nth(1).click()

    })
})