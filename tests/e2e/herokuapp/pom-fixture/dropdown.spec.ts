import { test, expect } from '../fixtures/haroku.fixture.ts';

test.describe('the-internet', () => {


    test('Select one optione on dropdown successfully', async ({ dropdownPage }) => {

        await dropdownPage.goto();

        const actualSelection1 = await dropdownPage.selectOption('Option 1');
        expect(actualSelection1).toContain('Option 1');

        const actualSelection2 = await dropdownPage.selectOption('Option 2');
        expect(actualSelection2).toContain('Option 2');

    })
})

test.describe('qa-demo-site-ten', () => {

    test('Select multiple options on dropdown successfully', async ({ page }) => {
        await page.goto('https://qa-demo-site-ten.vercel.app/elements/dropdown');
        await page.getByRole('listbox').selectOption(['py', 'java', 'kotlin']);
        await expect(page.locator('#native-languages + p')).toHaveText('Selected: py, java, kotlin');

        await page.getByRole('listbox').selectOption([]);
        await expect(page.getByRole('listbox')).toHaveValues([]);
        //await expect(page.locator('#native-languages + p')).not.toBeVisible;

        await page.pause();
    })

    test('Select one option on Native Select dropdown box', async ({ page }) => {
        await page.goto('https://qa-demo-site-ten.vercel.app/elements/dropdown');
        await page.getByTestId('dropdown-native').selectOption({ label: 'SvelteKit' });
        await expect(page.getByText('Selected: svelte', { exact: true })).toBeVisible();

        await page.pause()
    })

})