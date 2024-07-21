import {test,expect} from "../test-fixture";
import * as fs from 'fs';
import {faker} from "@faker-js/faker";


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

        await adminPage.accessCheckoutPage().cardNumberInputIframe.waitFor({state:'attached'})
        await adminPage.accessCheckoutPage().cardCvcInputIframe.waitFor({state:'attached'})
        await adminPage.accessCheckoutPage().cardsExpireDateInputIframe.waitFor({state:'attached'})

        //customer part
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        await adminPage.accessCheckoutPage().firstNameInput.fill(firstName)
        await adminPage.accessCheckoutPage().lastNameInput.fill(lastName)
        await adminPage.accessCheckoutPage().emailInput.fill(`${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`)

        //billing part
        await adminPage.accessCheckoutPage().streetAddressInput.fill(faker.location.street())
        await adminPage.accessCheckoutPage().cityAddressInput.fill(faker.location.city())
        await adminPage.accessCheckoutPage().zipAddressInput.fill(faker.location.zipCode())
        await adminPage.accessCheckoutPage().countryAddressCombobox.selectOption({index:1})
        await adminPage.accessCheckoutPage().stateAddressInputCombobox.selectOption({index:1})

        //stripe part
        await adminPage.accessCheckoutPage().cardNumberInputIframe.fill('4242424242424242')
        await adminPage.accessCheckoutPage().cardsExpireDateInputIframe.fill('1230')
        await adminPage.accessCheckoutPage().cardCvcInputIframe.fill('123')

        //mocking stripe api request
        await adminPage.page.route('https://api.stripe.com/v1/payment_intents/**', async route => {
            const jsonResponse = {
                response: "mocked response of stripe"
            };
            await route.fulfill({
                status: 200, // HTTP status code
                contentType: 'application/json', // Content type of the response
                body: JSON.stringify(jsonResponse) // Stringify the JSON response
            });
        })

        await adminPage.page.route('http://localhost:8080/api/checkout/payment-intent', async route => {
            const jsonResponse = {
                response: "mocked payment intent response",
                client_secret: "pi_mockedid_secret_mockedsecret"
            };
            await route.fulfill({
                status: 200, // HTTP status code
                contentType: 'application/json', // Content type of the response
                body: JSON.stringify(jsonResponse) // Stringify the JSON response
            });
        })

        const responsePromise = adminPage.page.waitForResponse(response =>
            response.url() === 'http://localhost:8080/api/checkout/purchase' && response.status() === 200
        );
        await adminPage.accessCheckoutPage().submitBtn.click()
        const response = await responsePromise;
        await response.finished()
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('orderTrackingNumber')
    })
})