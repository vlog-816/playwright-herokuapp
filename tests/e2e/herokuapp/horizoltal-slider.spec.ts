import { test, expect } from '@playwright/test';

test('Press on horizoltal slider', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    const silder = page.getByRole('slider');
    await silder.fill('3');
    await expect(page.locator('span[id="range"]')).toHaveText('3');

    let range = Number(await page.locator('span[id="range"]').textContent());
    const sliderValue = 4.5;

    while (range !== sliderValue) {
        await silder.press('ArrowRight');
        await page.waitForTimeout(100);

        range = Number(await page.locator('span[id="range"]').textContent())
    }

    await expect(page.locator('span[id="range"]')).toHaveText(sliderValue.toString());
})

test('Press on horizoltal slider using for loop', async ({ page }) => {

    page.goto('https://the-internet.herokuapp.com/horizontal_slider');

    const slider = page.getByRole('slider');
    const range = 5;

    for (let index = 0; index < range; index++) {
        await slider.press('ArrowRight');
        await page.waitForTimeout(100);
    }

    await expect(page.locator('span[id="range"]')).toHaveText('2.5');
})