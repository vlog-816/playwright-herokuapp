import {test, expect} from '@playwright/test';

test('Upload a static file successfully', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles(`D:/Source/PW2026/tests/upload-data/git-command.jpg`);
    await page.locator('#file-submit').click();

    await expect(page.getByText('File Uploaded!')).toBeVisible();
    await expect(page.getByText('git-command.jpg')).toBeVisible();
})