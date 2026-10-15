import { test, expect } from '@playwright/test';

test('Nested iframe: Verify the text content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    const actTextL = await page.frameLocator('frame[name="frame-top"]')
        .frameLocator('frame[name="frame-left"]')
        .locator('body').textContent();

    expect(actTextL?.trim()).toBe('LEFT');

    const actTextM = await page.frameLocator('frame[name="frame-top"]')
        .frameLocator('frame[name="frame-middle"]')
        .locator('body').textContent();

    expect(actTextM?.trim()).toBe('MIDDLE')

    const actTextR = await page.frameLocator('frame[name="frame-top"]')
        .frameLocator('frame[name="frame-right"]')
        .locator('body').textContent();

    expect(actTextR?.trim()).toBe('RIGHT')

    const actualTextB = await page.frameLocator('frame[name="frame-bottom"]')
        .locator('body').textContent()
    expect(actualTextB?.trim()).toBe('BOTTOM');

})