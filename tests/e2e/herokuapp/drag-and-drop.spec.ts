import { test, expect } from '@playwright/test';

test('Drag and drop A to B and verse', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await page.locator('#column-a').dragTo(page.locator('#column-b'));

    await expect(page.locator('#column-a>header')).toContainText('B');
    await expect(page.locator('#column-b>header')).toContainText('A');

})