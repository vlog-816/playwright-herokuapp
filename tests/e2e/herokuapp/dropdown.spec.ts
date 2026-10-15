import { test, expect } from '@playwright/test';

test.describe('the-internet', () => {


    test('Select one optione on dropdown successfully', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/dropdown');
        await page.getByRole('combobox').selectOption({ value: "1" });
        await expect(page.getByRole('combobox')).toHaveValue('1');
        await expect(page.getByRole('combobox')).toContainText('Option 1');

        await page.getByRole('combobox').selectOption({ value: "2" });
        await expect(page.getByRole('combobox')).toHaveValue('2');
        await expect(page.getByRole('combobox')).toContainText('Option 2');

        await page.pause()
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

    test('Select one option on Native Select dropdown box', async ({page}) => {
        await page.goto('https://qa-demo-site-ten.vercel.app/elements/dropdown');
        await page.getByTestId('dropdown-native').selectOption({label: 'SvelteKit'});
        await expect(page.getByText('Selected: svelte', {exact: true})).toBeVisible();

        await page.pause()
    })

})