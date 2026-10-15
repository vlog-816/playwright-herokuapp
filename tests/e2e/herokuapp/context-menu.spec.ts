import {test, expect} from '@playwright/test';

test('Right click in the box', async ({page}) => {

    await page.goto('https://the-internet.herokuapp.com/context_menu');
    await page.locator('#hot-spot').click({button: 'right'});

    await page.on('dialog', async dialog => {

        console.log(await dialog.message())
    })
})

test("verify context menu popup", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/context_menu")

    page.on('dialog', async (dialog) => {
        await dialog.accept();
    });
    await page.locator('#hot-spot').click({ button: 'right' })

})