import { test, expect } from '../fixtures/haroku.fixture';

test.describe('Happy path', () => {
    test('Checkbox is checked successfully', async ({ checkboxPage }) => {

        await checkboxPage.goto();
        await checkboxPage.checkCheckbox(1);
        expect(await checkboxPage.isChecked(1)).toBe(true);

        await checkboxPage.checkCheckbox(2);
        expect(await checkboxPage.isChecked(2)).toBe(true);

        await checkboxPage.page.pause();
    })

    test('Checkbox is unchecked successfully', async ({ checkboxPage }) => {

        await checkboxPage.goto()

        await checkboxPage.uncheckCheckbox(1);
        expect(await checkboxPage.isChecked(1)).toBe(false);

        await checkboxPage.uncheckCheckbox(2);
        expect(await checkboxPage.isChecked(2)).toBe(false);

        await checkboxPage.page.pause();
    })
})