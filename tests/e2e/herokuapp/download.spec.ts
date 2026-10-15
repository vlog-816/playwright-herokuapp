import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Download all documents', async ({ page }) => {

    test.slow();
    await page.goto('https://the-internet.herokuapp.com/download');
    const hrefs = await page.locator('#content a').all();
    const hrefs_5 = hrefs.slice(0, 5);

    for (const link of hrefs_5) {
        const downloadPromise = page.waitForEvent('download');
        await link.click();
        const download = await downloadPromise;
        const filePath = 'tests/download-data/' + download.suggestedFilename();

        await download.saveAs(filePath);

    }
})

test('Download one file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    const downloadPromise = page.waitForEvent('download');
    await page.getByText('file_1784907052265.pdf').click();
    const download = await downloadPromise;

    const dateTimeStamp = (new Date(Date.now()).toLocaleString()).replaceAll('/', '');

    const filePath = 'tests/download-data/' + download.suggestedFilename();

    await download.saveAs(filePath);

    expect(download.suggestedFilename()).toBe('file_1784907052265.pdf');
    expect(await download.failure()).toBeNull();

    const fileStats = fs.statSync(filePath);
    const fileSizeInBytes = fileStats.size;

    expect(fileSizeInBytes).toBeLessThan(5000);
})

test('Get all document links', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');
    //get all hrefs => loop each  href and click download 

    const hrefs = await page.locator('#content a').evaluateAll((hrefs => {

        return hrefs.map(href =>
            href.getAttribute('href')
        )
    }))

    console.log(hrefs);
})