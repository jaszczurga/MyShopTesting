import {expect, Page, test} from "@playwright/test";


test.describe('Authentication process test suite',() => {

    test.describe.configure({ mode: 'serial' });

    let page: Page;



    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('001 given not logged in user when accesing the main page then doesnt see authenticated only buttons', async ({ }) => {
        await page.goto('./products');
        const isCartButton = await page.locator('.cart-link').isVisible()
        const isMyProductsButton = await page.getByRole('link', { name: 'MyProducts' }).isVisible();
        const isOrdersButton = await page.getByRole('link', { name: 'Orders' }).isVisible();
        const isChatButton = await page.getByRole('link', { name: 'chat' }).isVisible();
        const isChatIconButton = await page.locator('.chat-icon').isVisible();
        const authButtonText = await page.getByTestId('authLoginButtonTestId').textContent();

        expect(isCartButton).toBeFalsy()
        expect(isMyProductsButton).toBeFalsy()
        expect(isOrdersButton).toBeFalsy()
        expect(isChatButton).toBeFalsy()
        expect(isChatIconButton).toBeFalsy()
        expect(authButtonText).toContain('Login')
    });

    test('002 given admin credentials when logging in then redirect to main page with admin features avaible', async({}) => {
        await page.goto('./products');
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByLabel('Email:').fill(process.env.ADMIN_EMAIL)
        await page.getByLabel('Password:').fill(process.env.ADMIN_PASSWORD)
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForURL('**/products',{timeout:5000});


        const isCartButton = await page.locator('.cart-link').isVisible()
        const isMyProductsButton = await page.getByRole('link', { name: 'MyProducts' }).isVisible();
        const isOrdersButton = await page.getByRole('link', { name: 'Orders' }).isVisible();
        const isChatButton = await page.getByRole('link', { name: 'chat' }).isVisible();
        const isChatIconButton = await page.locator('.chat-icon').isVisible();
        const authButtonText = await page.getByTestId('authLogoutButtonTestId').textContent();

        expect(isCartButton).toBeTruthy()
        expect(isMyProductsButton).toBeTruthy()
        expect(isOrdersButton).toBeTruthy()
        expect(isChatButton).toBeTruthy()
        expect(isChatIconButton).toBeFalsy()
        expect(authButtonText).toContain('Logout')
    })
    
    // test('given credentials when register then redirect to main page with saved token', async({page}) => {
    //     const credentials ={
    //         username: "test",
    //         email: "test@automation.com",
    //         password: "pass",
    //     }
    // })
    //
    // test('given logout action when clicked button then logout user from website', async({page}) => {
    //
    // })
    //
    // test('given credentials when logging in then redirect to main page and save token', async({page}) => {
    //
    // })
    //
    // test('002 given logged in user when accessing the main page then see user accessible buttons', async({page}) => {
    //
    // })
    
})



