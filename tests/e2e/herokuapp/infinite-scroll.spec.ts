import { test, expect } from '@playwright/test';

test('Verify content displays on screen after scrolling', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/infinite_scroll');

    for (let index = 0; index < 5; index++) {

        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(1000);
    }
})

// test('Verify content displays on screen after scrolling', async ({ page }) => {

//     await page.goto('https://the-internet.herokuapp.com/infinite_scroll');
//     const targetText = page.getByText('Optio tempore');

//     while (!(await targetText.isVisible())) {

//         await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
//         await page.waitForTimeout(500);
//     }

//     expect(targetText).toBeVisible();
// })