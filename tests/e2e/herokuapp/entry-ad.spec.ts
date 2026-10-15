import { test, expect } from '@playwright/test';

test('Close the entry-ad by <wait for Event>', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/entry_ad');

    page.on('popup', async popup => {
        await popup.waitForLoadState();
        await page.waitForTimeout(5000);
        console.log(await popup.title());
        await popup.close();
    })

    expect(page.getByRole('heading', { name: "THIS IS A MODAL WINDOW" })).not.toBeVisible();
})

test('Close the entry-ad by Clicking the Close Button', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/entry_ad');
    await page.getByText('Close', { exact: true }).click();
    expect(page.getByRole('heading', { name: "THIS IS A MODAL WINDOW" })).not.toBeVisible()
})