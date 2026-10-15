import { test, expect } from '@playwright/test';

test('Verify status code display correctly', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/status_codes');
    await page.getByRole('link', { name: "200" }).click();
    await expect(page.getByText('This page returned a 200 status code')).toBeVisible();

    await page.getByRole('link', { name: "here" }).click();
    await page.getByRole('link', { name: "301" }).click();
    await expect(page.getByText('This page returned a 301 status code')).toBeVisible();

    await page.getByRole('link', { name: "here" }).click();
    await page.getByRole('link', { name: "404" }).click();
    await expect(page.getByText('This page returned a 404 status code')).toBeVisible();

    await page.getByRole('link', { name: "here" }).click();
    await page.getByRole('link', { name: "500" }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/500');

    await page.getByRole('link', { name: "here" }).click();
    await page.pause();
})