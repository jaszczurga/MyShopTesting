import { test, expect } from "../test-fixture";

async function checkButtonVisibility(page) {
    const isCartButton = await page.accessMainPage().cartButton.isVisible();
    const isMyProductsButton = await page.accessMainPage().myProductsButton.isVisible();
    const isOrdersButton = await page.accessMainPage().ordersButton.isVisible();
    const isChatButton = await page.accessMainPage().chatButton.isVisible();
    const isChatIconButton = await page.accessMainPage().chatIconButton.isVisible();
    const authLogoutButtonText = await page.accessMainPage().authLogoutButtonText.isVisible();
    const authLoginButtonText = await page.accessMainPage().authLoginButtonText.isVisible();

    return {
        isCartButton,
        isMyProductsButton,
        isOrdersButton,
        isChatButton,
        isChatIconButton,
        authLogoutButtonText,
        authLoginButtonText
    };
}

test.describe('testing appearance of main page with logged in user and different roles', () => {
    test('001 given not logged in admin when accessing the main page then doesn\'t see authenticated admin only buttons',{tag:["@admin"]},async ({ adminPage }) => {
        await adminPage.accessMainPage().goto();
        await adminPage.page.waitForLoadState();

        const visibility = await checkButtonVisibility(adminPage);

        expect(visibility.isCartButton).toBeTruthy();
        expect(visibility.isMyProductsButton).toBeTruthy();
        expect(visibility.isOrdersButton).toBeTruthy();
        expect(visibility.isChatButton).toBeTruthy();
        expect(visibility.isChatIconButton).toBeFalsy();
        expect(visibility.authLogoutButtonText).toBeTruthy();
        expect(visibility.authLoginButtonText).toBeFalsy();
    });

    test('001 given not logged in user when accessing the main page then doesn\'t see authenticated user only buttons',{tag:["@user"]},async ({ userPage }) => {
        await userPage.accessMainPage().goto();
        await userPage.page.waitForLoadState();

        const visibility = await checkButtonVisibility(userPage);

        expect(visibility.isCartButton).toBeTruthy();
        expect(visibility.isMyProductsButton).toBeFalsy();
        expect(visibility.isOrdersButton).toBeTruthy();
        expect(visibility.isChatButton).toBeFalsy();
        expect(visibility.isChatIconButton).toBeTruthy();
        expect(visibility.authLogoutButtonText).toBeTruthy();
        expect(visibility.authLoginButtonText).toBeFalsy();
    });
});