import { test, expect } from '@playwright/test';

test.describe('Happy path', () => {
    test('Checkbox is checked successfully', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        await page.getByRole('checkbox').first().check();
        await page.getByRole('checkbox').last().check();

        await expect(page.getByRole('checkbox').first()).toBeChecked;
        await expect(page.getByRole('checkbox').last()).toBeChecked;
        await page.pause();
    })

    test('Checkbox is unchecked successfully', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        await page.getByRole('checkbox').nth(0).uncheck();``
        await page.getByRole('checkbox').nth(1).uncheck();``

        await expect(page.getByRole('checkbox').nth(0)).not.toBeChecked;
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked;
        await page.pause()
    })
})