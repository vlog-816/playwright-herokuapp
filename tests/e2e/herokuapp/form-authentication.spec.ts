import { test, expect } from '@playwright/test';

test.describe('Happy path', () => {
    test('Login succeeds with valid credentials', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
        await page.getByRole('button', { name: ' Login' }).click();

        await expect(page.locator('#flash')).toContainText('You logged into a secure area!')
    })
})

test.describe('Negative path', () => {
    test('Login fails without credentials', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', { name: 'Username' }).fill('');
        await page.getByRole('textbox', { name: 'Password' }).fill('');
        await page.getByRole('button', { name: ' Login' }).click();

        await expect(page.locator('#flash')).toContainText('Your username is invalid!')
    })

    test('Login fails with invalid username', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmithh');
        await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
        await page.getByRole('button', { name: ' Login' }).click();

        await expect(page.locator('#flash')).toContainText('Your username is invalid!')
    })

    test('Login fails with invalid password', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');

        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword');
        await page.getByRole('button', { name: ' Login' }).click();

        await expect(page.locator('#flash')).toContainText('Your password is invalid!')
    })
})