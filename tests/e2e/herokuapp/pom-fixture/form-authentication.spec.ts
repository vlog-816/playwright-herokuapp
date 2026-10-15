import { test, expect } from '../fixtures/haroku.fixture.ts';

test.describe('Happy path', () => {
    test('Login succeeds with valid credentials', async ({ loginPage }) => {

        await loginPage.goto();
        await loginPage.submitForm('tomsmith', 'SuperSecretPassword!');

        await expect(loginPage.flashMessage).toContainText('You logged into a secure area!')
    })
})

test.describe('Negative path', () => {
    test('Login fails without credentials', async ({ loginPage }) => {

        await loginPage.goto();
        await loginPage.submitForm('', '');

        await expect(await loginPage.getFlashMessage()).toContainText('Your username is invalid!')
    })

    test('Login fails with invalid username', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.submitForm('tomsmithh', 'SuperSecretPassword!');

        await expect(await loginPage.getFlashMessage()).toContainText('Your username is invalid!')
    })

    test('Login fails with invalid password', async ({ loginPage }) => {

        await loginPage.goto();
        await loginPage.submitForm('tomsmith', 'SuperSecretPassword');

        await expect(await loginPage.getFlashMessage()).toContainText('Your password is invalid!')
    })
})