import {expect, Locator, Page} from "@playwright/test";


export class AdminMyProductsPage{
    readonly page: Page;
    readonly pageUrl = process.env.ADMIN_MY_PRODUCTS

    readonly productsTable: Locator;
    readonly columnHeaders: Locator;
    readonly addCategoryBtn: Locator;
    readonly categoryOptions: CategoryOptionBtn;
   // readonly categoryOptionBtns:Locator
    readonly tableRows:Locator
    readonly addCategoryDialog: AddCategoryDialog


    constructor(page: Page) {
        this.page = page;

        this.productsTable = page.getByRole('table');
        this.columnHeaders = page.getByRole('table').locator('th');
        this.addCategoryBtn = page.getByRole('button', { name: "Add Category" });
       // this.categoryOptionBtns = page.getByRole('table').getByRole('button');
        this.tableRows = page.getByRole('table').getByRole('row');

        this.categoryOptions = {
            editBtn: page.getByRole('menuitem',{name:"Edit Category"}),
            deleteBtn: page.getByRole('menuitem',{name:"Delete Category"}),
            productsBtn: page.getByRole('menuitem', { name: 'Products' })
        }

        this.addCategoryDialog = {
            dialog: page.locator('mat-dialog-container'),
            closeBtn: page.locator('mat-dialog-container').getByRole('button', { name: "close" }),
            saveBtn: page.locator('mat-dialog-container').getByRole('button', { name: "save" }),
            input: page.locator('mat-dialog-container').getByRole('textbox'),
        }
    }
    async goto(){
        await this.page.goto(this.pageUrl)
    }

    async openDialogForGivenCategoryName(categoryName:string){
        const rowWithCategory = this.tableRows.filter({hasText:categoryName}).first()
        await rowWithCategory.getByRole('button').click()
    }



}

interface AddCategoryDialog {
    dialog:Locator
    closeBtn:Locator
    saveBtn:Locator
    input:Locator
}

interface CategoryOptionBtn{
    editBtn:Locator
    deleteBtn:Locator
    productsBtn:Locator
}
