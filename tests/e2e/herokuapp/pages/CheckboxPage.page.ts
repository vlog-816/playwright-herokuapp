import { Page, Locator } from "@playwright/test";

export class CheckboxPage {

    readonly page: Page;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox1 = page.getByRole('checkbox').nth(0);
        this.checkbox2 = page.getByRole('checkbox').nth(1);
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
    }

    async checkCheckbox(index: number) {

        if (!index) throw new Error("Missing selection checkbox");
        const checked = await this.isChecked(index);

        if (index === 1 && !checked) {
            await this.checkbox1.check();
        } else if (index === 2 && !checked) {
            await this.checkbox2.check();
        }
    }

    async uncheckCheckbox(index: number) {

        if (!index) throw new Error("Missing selection checkbox");
        const checked = await this.isChecked(index);

        if (index === 1 && checked) {
            await this.checkbox1.uncheck();
        } else if (index === 2 && checked) {
            await this.checkbox2.uncheck();
        }
    }

    async isChecked(index: number) {

        if (!index) throw new Error("Missing selection checkbox");

        if (index === 1) {
            return await this.checkbox1.isChecked();
        } else if (index === 2) {
            return await this.checkbox2.isChecked();
        }
    }

}