import { test, expect } from './fixtures/haroku.fixture';

test.describe('Happy path', () => {
    test('Checkbox is checked successfully', async ({ checkboxPage }) => {
        await checkboxPage.goto();
        await checkboxPage.checkCheckbox(1);
        await checkboxPage.checkCheckbox(2);

        await expect(checkboxPage.checkbox1).toBeChecked();
        await expect(checkboxPage.checkbox2).toBeChecked();
    })

    test('Checkbox is unchecked successfully', async ({ checkboxPage }) => {
        await checkboxPage.goto();
        await checkboxPage.uncheckCheckbox(1);
        await checkboxPage.uncheckCheckbox(2);

        await expect(checkboxPage.checkbox1).not.toBeChecked();
        await expect(checkboxPage.checkbox2).not.toBeChecked();
    })
})