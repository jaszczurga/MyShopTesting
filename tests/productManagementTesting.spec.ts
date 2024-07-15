import {test,expect} from "../test-fixture";
import {faker} from "@faker-js/faker";


test.describe.serial('tests connected with admin/manager management of categories',() => {

    let categoryName = faker.vehicle.manufacturer()

    test('001 given name of category when add new category then added new category to database', async({adminPage}) => {
        await adminPage.accessAdminCategories().goto()

        await adminPage.accessAdminCategories().addCategoryBtn.click()
        await adminPage.accessAdminCategories().addCategoryDialog.input.fill(categoryName)
        await adminPage.accessAdminCategories().addCategoryDialog.saveBtn.click()

        const addedCategory = adminPage.accessAdminCategories().productsTable.getByRole('row',{name:categoryName})
        await expect(addedCategory).toBeVisible()
    })

    test('002 given name of category to update when update category then new name visible', async({adminPage}) => {

        await adminPage.accessAdminCategories().goto()

        await adminPage.accessAdminCategories().openDialogForGivenCategoryName(categoryName)
        categoryName = `${categoryName}Updated`

        await adminPage.accessAdminCategories().categoryOptions.editBtn.click()
        await adminPage.accessAdminCategories().addCategoryDialog.input.fill(categoryName)
        await adminPage.accessAdminCategories().addCategoryDialog.saveBtn.click()
        const addedCategory = adminPage.accessAdminCategories().productsTable.getByRole('row',{name:categoryName})
        await expect(addedCategory).toBeVisible()

    })

    test('003 given name of category when delete one then delete category from database', async({adminPage}) => {
        await adminPage.accessAdminCategories().goto()
        await adminPage.accessAdminCategories().openDialogForGivenCategoryName(categoryName)
        await adminPage.accessAdminCategories().categoryOptions.deleteBtn.click()

        const categoryRow = adminPage.accessAdminCategories().tableRows.filter({hasText:categoryName}).first()
        await categoryRow.waitFor({state:'detached'})
        await adminPage.page.waitForTimeout(500)

        await expect(categoryRow).toBeHidden()
    })
})

test.describe('product management testing',() => {

    test.beforeAll(async({adminPage}) => {
        await adminPage.accessAdminCategories().goto()

        await adminPage.accessAdminCategories().addCategoryBtn.click()
        await adminPage.accessAdminCategories().addCategoryDialog.input.fill("testCategory")
        await adminPage.accessAdminCategories().addCategoryDialog.saveBtn.click()

        const addedCategory = adminPage.accessAdminCategories().productsTable.getByRole('row',{name:"testCategory"})
        await expect(addedCategory).toBeVisible()
    })

    test.afterAll(async({adminPage}) => {
        await adminPage.accessAdminCategories().goto()
        await adminPage.accessAdminCategories().openDialogForGivenCategoryName("testCategory")
        await adminPage.accessAdminCategories().categoryOptions.deleteBtn.click()
    })

    const exampleProduct ={
        name: faker.vehicle.vehicle(),
        description: faker.string.alpha({length:{min:10,max:20}}),
        price: faker.number.bigInt({min:1000,max:100000}),
        stockNumber: faker.number.bigInt({min:10,max:100}),
        image: process.env.TEST_IMAGE_PATH
    }


    test('001 adding product test', async({adminPage}) => {
        const responsePredicate = response => {
            return response.url() === 'http://localhost:8080/api/action/categories?page=0&size=10' &&
                response.status() === 200 &&
                response.request().method() === 'GET';
        };



        await adminPage.accessAdminCategories().goto()
        await adminPage.accessAdminCategories().tableRows.filter({hasText:"testCategory"}).first().getByRole('button').click()
        await adminPage.accessAdminCategories().categoryOptions.productsBtn.click()


        const responsePromise =  adminPage.page.waitForResponse(responsePredicate);
        await adminPage.accessAdminProducts().addProductBtn.click()
        const response = await responsePromise;
        await response.finished()


        await adminPage.accessAdminProducts().addProductDialog.nameInput.fill(exampleProduct.name)
        await adminPage.accessAdminProducts().addProductDialog.productDescriptionInput.fill(exampleProduct.description)


        //await adminPage.page.waitForTimeout(1000)
        await adminPage.accessAdminProducts().addProductDialog.chooseCategorySelector.selector.click()

        await adminPage.accessAdminProducts().addProductDialog.chooseCategorySelector.options.getByText('testCategory').click()
        await adminPage.accessAdminProducts().addProductDialog.priceInput.fill(exampleProduct.price.toString())
        await adminPage.accessAdminProducts().addProductDialog.stockInput.fill(exampleProduct.stockNumber.toString())


        const fileChooserPromise = adminPage.page.waitForEvent('filechooser')
        await adminPage.accessAdminProducts().addProductDialog.imageInput.click()
        const fileChooser = await fileChooserPromise
        await fileChooser.setFiles(exampleProduct.image)

        await adminPage.accessAdminProducts().addProductDialog.saveBtn.click()
    })
})