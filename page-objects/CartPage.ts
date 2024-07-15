

import {expect, Locator, Page} from "@playwright/test";


export class CartPage {
    readonly page: Page;
    readonly pageUrl = process.env.CART_URL

    readonly checkoutBtn: Locator
    readonly cartTable: Locator

    private cartRows: CartRow
    private givenRow:Locator




    constructor(page: Page) {
        this.page = page;

        this.checkoutBtn = page.getByRole('link',{name:"Checkout"})
        this.cartTable = page.getByRole('table')



    }
    async goto(){
        await this.page.goto(this.pageUrl)
    }

    async row(productName:string){
         this.givenRow = this.cartTable.locator('tr').filter({hasText:productName})
            this.cartRows = {
            removeBtn: this.page.getByRole('button',{name:"Remove"}),
            addMoreBtn: this.givenRow.getByRole('cell', { name: 'Quantity Remove Subtotal: $' }).getByRole('button').first(),
            removeOneBtn: this.givenRow.getByRole('cell', { name: 'Quantity Remove Subtotal: $' }).getByRole('button').nth(2)
        }
        return this.cartRows
    }

}

interface CartRow {
    removeBtn: Locator
    addMoreBtn: Locator
    removeOneBtn: Locator
}

