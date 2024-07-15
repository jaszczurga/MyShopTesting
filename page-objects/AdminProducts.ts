import {expect, Locator, Page} from "@playwright/test";


export class AdminProducts {
    readonly page: Page;
    readonly pageUrl = process.env.ADMIN_MY_PRODUCTS

    readonly productsTable: Locator;
    readonly columnHeaders: Locator;
    readonly addProductBtn: Locator;
    readonly productOptions: ProductOptions;
    readonly tableRows:Locator
    readonly addProductDialog: AddProductDialog


    constructor(page: Page) {
        this.page = page;

        this.productsTable = page.getByRole('table');
        this.columnHeaders = page.getByRole('table').locator('th');
        this.addProductBtn = page.getByRole('button', { name: "Add Product" });
        // this.categoryOptionBtns = page.getByRole('table').getByRole('button');
        this.tableRows = page.getByRole('table').getByRole('row');

        this.productOptions = {
            editBtn: page.getByRole('menuitem',{name:"Edit Product"}),
            deleteBtn: page.getByRole('menuitem',{name:"Delete Product"}),
        }

        this.addProductDialog = {
            nameInput: page.getByRole('textbox',{name:"Name"}),
            productDescriptionInput: page.getByRole('textbox',{name:"Product Description"}),
            chooseCategorySelector: {
                selector: page.getByTestId('categorySelector'),
                options: page.getByTestId("categoryOption")
            },
            stockInput: page.getByRole('textbox',{name:"Stock"}),
            priceInput: page.getByRole('textbox',{name:"Price"}),
            imageInput: page.locator('input[type="file"]'),
            imageDeleteBtn: page.getByRole('button',{name:"delete"}),
            saveBtn: page.getByRole('button',{name:"save"}),
            closeBtn: page.getByRole('button',{name:"close"})
        }
    }
    async goto(categoryId:number){
        await this.page.goto(`${this.pageUrl}/${categoryId}`)
    }

    async openDialogForGivenProductName(productName:string){
        const rowWithProduct = this.tableRows.filter({hasText:productName}).first()
        await rowWithProduct.getByRole('button').click()
    }
}

interface AddProductDialog {
    nameInput: Locator
    productDescriptionInput: Locator
    chooseCategorySelector: {
        selector: Locator
        options: Locator
    }
    stockInput:Locator
    priceInput: Locator
    imageInput: Locator
    imageDeleteBtn: Locator
    saveBtn: Locator
    closeBtn: Locator
}

interface ProductOptions{
    editBtn:Locator
    deleteBtn:Locator
}
