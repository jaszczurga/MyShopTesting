import {test,expect} from "../test-fixture";
import {faker} from "@faker-js/faker";


test.describe.serial('tests connected with admin/manager management of products operations',() => {

    let categoryName = faker.vehicle.manufacturer()

    test('001 given name of category when add new category then added new category to database', async({adminPage}) => {
        await adminPage.accessAdminMyProductsPage().goto()

        await adminPage.accessAdminMyProductsPage().addCategoryBtn.click()
        await adminPage.accessAdminMyProductsPage().addCategoryDialog.input.fill(categoryName)
        await adminPage.accessAdminMyProductsPage().addCategoryDialog.saveBtn.click()

        const addedCategory = adminPage.accessAdminMyProductsPage().productsTable.getByRole('row',{name:categoryName})
        await expect(addedCategory).toBeVisible()
    })

    test('002 given name of category to update when update category then new name visible', async({adminPage}) => {

        await adminPage.accessAdminMyProductsPage().goto()

        await adminPage.accessAdminMyProductsPage().openDialogForGivenCategoryName(categoryName)
        categoryName = `${categoryName}Updated`

        await adminPage.accessAdminMyProductsPage().categoryOptions.editBtn.click()
        await adminPage.accessAdminMyProductsPage().addCategoryDialog.input.fill(categoryName)
        await adminPage.accessAdminMyProductsPage().addCategoryDialog.saveBtn.click()
        const addedCategory = adminPage.accessAdminMyProductsPage().productsTable.getByRole('row',{name:categoryName})
        await expect(addedCategory).toBeVisible()

    })

    test('003 given name of category when delete one then delete category from database', async({adminPage}) => {
        await adminPage.accessAdminMyProductsPage().goto()
        await adminPage.accessAdminMyProductsPage().openDialogForGivenCategoryName(categoryName)
        await adminPage.accessAdminMyProductsPage().categoryOptions.deleteBtn.click()

        const categoryRow = adminPage.accessAdminMyProductsPage().tableRows.filter({hasText:categoryName}).first()
        await categoryRow.waitFor({state:'detached'})
        await adminPage.page.waitForTimeout(500)

        await expect(categoryRow).toBeHidden()
    })
})