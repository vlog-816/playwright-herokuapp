import { Page, Locator } from '@playwright/test';

export class BmiPage {

    readonly page: Page;
    readonly ageInput: Locator;
    readonly heightInput: Locator;
    readonly weightInput: Locator;
    readonly maleBtn: Locator;
    readonly femaleBtn: Locator;
    readonly calculateBtn: Locator;
    readonly clearBtn: Locator;
    readonly result: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ageInput = page.locator('#cage');
        this.maleBtn = page.locator('label[for="csex1"] span');
        this.femaleBtn = page.locator('label[for="csex2"] span');
        this.heightInput = page.locator('#cheightmeter');
        this.weightInput = page.locator('#ckg');
        this.calculateBtn = page.getByRole('button', { name: 'Calculate' });
        this.clearBtn = page.getByRole('button', { name: "Clear" });
        this.result = page.locator('.rightresult .bigtext');
    }

    async goto() {
        await this.page.goto('https://www.calculator.net/bmi-calculator.html');
    }

    async resetForm() {
        await this.clearBtn.click();
    }

    async fillFormAndCalculate(age: string, gender: string, height: number, weight: number) {
        await this.ageInput.fill(age);
        if (gender === 'male') {
            await this.maleBtn.check();
        } else {
            await this.femaleBtn.check();
        }
        await this.heightInput.fill(height.toString());
        await this.weightInput.fill(weight.toString());
        await this.calculateBtn.click();
    }

    calculateBMI(height: number, weight: number, category: string) {
        const resultCal = Number(weight / Math.pow(height / 100, 2)).toFixed(1);
        const expectedResult = `BMI = ${resultCal} kg/m2 ${category}`;

        return expectedResult
    }

    async getResult() {
        const actualResult = (await this.page.locator('.rightresult .bigtext').innerText()).replace(/\s+/g, ' ').trim();

        return actualResult
    }

}