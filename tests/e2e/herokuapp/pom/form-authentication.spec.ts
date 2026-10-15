import { LoginPage } from './../pages/LoginPage.page';
import { test, expect } from '@playwright/test';

test.describe('Happy path', () => {
    test('Login succeeds with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.submitForm('tomsmith', 'SuperSecretPassword!');

        await expect(await loginPage.getFlashMessage()).toContainText('You logged into a secure area!')
    })
})

test.describe('Negative path', () => {
    test('Login fails without credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.submitForm('', '');

        await expect(await loginPage.getFlashMessage()).toContainText('Your username is invalid!')
    })

    test('Login fails with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.submitForm('tomsmithh', 'SuperSecretPassword!');

        await expect(await loginPage.getFlashMessage()).toContainText('Your username is invalid!')
    })

    test('Login fails with invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.submitForm('tomsmith', 'SuperSecretPassword');

        await expect(await loginPage.getFlashMessage()).toContainText('Your password is invalid!')
    })
})