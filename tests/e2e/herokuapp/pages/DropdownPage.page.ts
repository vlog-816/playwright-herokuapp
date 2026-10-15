import { Page, Locator } from '@playwright/test'

export class DropdownPage {

    readonly page: Page;
    readonly combobox: Locator;
    readonly listbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.combobox = page.getByRole('combobox');
        this.listbox = page.getByRole('listbox');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dropdown')
    }

    async gotoQAPage() {
        await this.page.goto('https://qa-demo-site-ten.vercel.app/elements/dropdown')
    }

    async selectOption(option: string) {
        await this.combobox.selectOption({ label: option });
        const seclectedText = await this.combobox.evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex].text)

        return seclectedText;
    }

    async selectMultiOptions(options: string[]) {
        await this.listbox.selectOption(options);

        const selectedTexts = await this.combobox.evaluate((el: HTMLSelectElement) => {
            return Array.from(el.selectedOptions).map(option => option.text.trim());
        });

        return selectedTexts;
    }
}