import {test,expect} from "../test-fixture";
import * as fs from 'fs';


test.describe('cart operations test suite',() => {

    test.beforeEach(async({request}) => {

        const path = 'json/saveProduct.json'
        const data = fs.readFileSync(path,'utf8')
        const product = JSON.parse(data)

        const response = await request.post('http://localhost:8080/api/action/saveProduct',{
            data:product,
            headers:{
                Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
            }
        })
        expect(response.status()).toEqual(200)

    })


    test('given product card when clicked add to cart then product in cart', async({adminPage}) => {
        await adminPage.accessMainPage().goto()

        await adminPage.accessMainPage().page.getByRole('button',{name:'Categories'}).click()
        await adminPage.accessMainPage().page.getByText('Test').click()
        await adminPage.accessMainPage().productCardsList.first().click()

        await adminPage.accessProductDetailPage().addToCartBtn.click()

        await adminPage.accessMainPage().cartButton.click()

        await adminPage.accessCartPage().checkoutBtn.click()
    })
})