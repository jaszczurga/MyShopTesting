

import {expect, Locator, Page} from "@playwright/test";


export class CheckoutPage {
    readonly page: Page;
    readonly pageUrl = process.env.CHECKOUT_URL

    readonly checkoutCard: Locator

    readonly lastNameInput: Locator
    readonly firstNameInput: Locator
    readonly emailInput: Locator
    readonly countryAddressCombobox: Locator
    readonly streetAddressInput: Locator
    readonly cityAddressInput: Locator
    readonly stateAddressInputCombobox: Locator
    readonly zipAddressInput: Locator
    readonly cardNumberInputIframe: Locator
    readonly cardsExpireDateInputIframe: Locator
    readonly cardCvcInputIframe: Locator

    readonly submitBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.checkoutCard = page.getByPlaceholder('checkoutForm')
        this.firstNameInput = this.page.getByPlaceholder('First Name')
        this.lastNameInput = this.page.getByPlaceholder('Last Name')
        this.emailInput = this.page.getByPlaceholder('Email')
        this.countryAddressCombobox = this.page.locator('[ng-reflect-name="country"]')
        this.streetAddressInput = this.page.locator('[ng-reflect-name="street"]')
        this.cityAddressInput = this.page.locator('[ng-reflect-name="city"]')
        this.stateAddressInputCombobox = this.page.locator('[ng-reflect-name="state"]')
        this.zipAddressInput = this.page.locator('[ng-reflect-name="zipCode"]')

        this.cardNumberInputIframe = this.page.frameLocator('[role="presentation"]').first().locator('[name="cardnumber"]')
        this.cardsExpireDateInputIframe = this.page.frameLocator('[role="presentation"]').first().locator('[name="exp-date"]')
        this.cardCvcInputIframe = this.page.frameLocator('[role="presentation"]').first().locator('[name="cvc"]')

        this.submitBtn = this.page.getByRole('button',{name:'Purchase'})
    }
    async goto(){
        await this.page.goto(this.pageUrl)
    }


}


