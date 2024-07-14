import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';


const adminFile = './.auth/admin.json';

setup('authenticate as admin @adminSetup', async({page}) => {
    await page.goto('./login');
    await page.getByLabel('Email:').fill(process.env.ADMIN_EMAIL)
    await page.getByLabel('Password:').fill(process.env.ADMIN_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/products',{timeout:5000});

    await page.context().storageState({ path: adminFile });

    // Read the storage state file
    const storageState = JSON.parse(fs.readFileSync(adminFile, 'utf-8'));

    // Extract the JWT token from the storage state cookies
    const jwtToken = storageState.cookies.find(cookie => cookie.name === 'jwtToken').value;

    // Save the JWT token to the .env file
    process.env['ADMIN_TOKEN'] = jwtToken
})

const userFile = './.auth/user.json'

setup('authenticate as user @userSetup', async({page}) => {
    await page.goto('./login');
    await page.getByLabel('Email:').fill(process.env.USER_EMAIL)
    await page.getByLabel('Password:').fill(process.env.USER_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/products',{timeout:5000});

    await page.context().storageState({ path: userFile });

    // Read the storage state file
    const storageState = JSON.parse(fs.readFileSync(userFile, 'utf-8'));

    // Extract the JWT token from the storage state cookies
    const jwtToken = storageState.cookies.find(cookie => cookie.name === 'jwtToken').value;

    // Save the JWT token to the .env file
    process.env['USER_TOKEN'] = jwtToken
})
