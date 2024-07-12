import { test as setup, expect } from '@playwright/test';


const adminFile = './.auth/admin.json';

setup('authenticate as admin', async({page}) => {
    await page.goto('./login');
    await page.getByLabel('Email:').fill(process.env.ADMIN_EMAIL)
    await page.getByLabel('Password:').fill(process.env.ADMIN_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/products',{timeout:5000});

    await page.context().storageState({ path: adminFile });
})

const userFile = './.auth/user.json'

setup('authenticate as user', async({page}) => {
    await page.goto('./login');
    await page.getByLabel('Email:').fill(process.env.USER_EMAIL)
    await page.getByLabel('Password:').fill(process.env.USER_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/products',{timeout:5000});

    await page.context().storageState({ path: userFile });
})
