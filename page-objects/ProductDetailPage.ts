import {Locator, Page} from "@playwright/test";


export class ProductDetailPage {
    readonly page: Page;
    readonly pageUrl = process.env.PRODUCT_DETAIL_URL


    readonly addToCartBtn: Locator
    readonly numberOfItemsInput: Locator

    //TODO: add more locators



    constructor(page:Page) {
        this.page= page

        this.addToCartBtn = page.getByRole('button',{name:"Add to Cart"})
        this.numberOfItemsInput = page.getByPlaceholder('Quantity')
    }

    async goto(productId:number){
        await this.page.goto(`${this.pageUrl}/${productId}`)
    }
}
