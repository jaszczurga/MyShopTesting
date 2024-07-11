import {expect, test} from "@playwright/test";


test.describe('Main page related to products browsing suite',() => {
    test('given not logged in user when accesing the main page then doesnt see authenticated only buttons', async ({ page }) => {
        await page.goto('http://localhost:4200/products');
        const isCartButton = await page.locator('.cart-link').isVisible()
        const isMyProductsButton = await page.getByRole('link', { name: 'MyProducts' }).isVisible();
        const isOrdersButton = await page.getByRole('link', { name: 'Orders' }).isVisible();
        const isChatButton = await page.getByRole('link', { name: 'chat' }).isVisible();
        const isChatIconButton = await page.locator('.chat-icon').isVisible();
        const authButtonText = await page.getByTestId('authButtonTestId').textContent();
        expect(isCartButton).toBeFalsy()
        expect(isMyProductsButton).toBeFalsy()
        expect(isOrdersButton).toBeFalsy()
        expect(isChatButton).toBeFalsy()
        expect(isChatIconButton).toBeFalsy()
        expect(authButtonText).toContain('Login')
    });
})



