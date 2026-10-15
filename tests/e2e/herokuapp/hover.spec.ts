import { test, expect } from '@playwright/test';

test('Verify figcaption displays when hovering on the image', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/hovers');

    await page.locator('.figure').nth(0).hover();
    await expect(page.getByRole('heading', { name: "name: user1" })).toBeVisible();
    await expect(page.getByRole('link', { name: "View profile" })).toBeVisible();

    await page.getByRole('img', { name: "User Avatar" }).nth(1).hover();
    await expect(page.getByRole('heading', { name: "name: user2" })).toBeVisible();
    await expect(page.getByRole('link', { name: "View profile" })).toBeVisible();

    await page.getByRole('img', { name: "User Avatar" }).nth(2).hover();
    await expect(page.getByRole('heading', { name: "name: user3" })).toBeVisible();
    await expect(page.getByRole('link', { name: "View profile" })).toBeVisible();
})