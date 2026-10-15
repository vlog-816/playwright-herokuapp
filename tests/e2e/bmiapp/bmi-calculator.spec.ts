import { test, expect } from '@playwright/test';

const testcases =
    [
        { age: '32', gender: 'male', height: 172, weight: 41, category: '(Severe thinness)' },
        { age: '32', gender: 'female', height: 162, weight: 43, category: '(Moderate thinness)' },
        { age: '32', gender: 'male', height: 152, weight: 41, category: '(Mild thinness)' },
        { age: '32', gender: 'female', height: 152, weight: 43, category: '(Normal)' },
        { age: '32', gender: 'male', height: 152, weight: 65, category: '(Overweight)' },
        { age: '32', gender: 'female', height: 152, weight: 70, category: '(Obese Class I)' },
        { age: '32', gender: 'male', height: 152, weight: 85, category: '(Obese Class II)' },
        { age: '32', gender: 'female', height: 152, weight: 95, category: '(Obese Class III)' }
    ]

testcases.forEach(({ age, gender, height, weight, category }) => {
    test(`Verify successful calculation ${category} with valid inputs: 
        age: ${age} gender: ${gender} height: ${height} weight ${weight}`, async ({ page }) => {

        await page.goto('https://www.calculator.net/bmi-calculator.html');

        const ageInput = page.locator('#cage');
        const maleBtn = page.locator('label[for="csex1"] span');
        const femaleBtn = page.locator('label[for="csex2"] span');
        const heightInput = page.locator('#cheightmeter');
        const weightInput = page.locator('#ckg');
        const calculateBtn = page.getByRole('button', { name: 'Calculate' });
        const resultCal = Number(weight / Math.pow(height / 100, 2)).toFixed(1);

        await page.getByRole('button', { name: "Clear" }).click();

        await ageInput.fill(age);
        if (gender === 'male') {
            await maleBtn.check();
        } else {
            await femaleBtn.check();
        }
        await heightInput.fill(height.toString());
        await weightInput.fill(weight.toString());
        await calculateBtn.click();

        const actualResult = (await page.locator('.rightresult .bigtext').innerText()).replace(/\s+/g, ' ').trim();
        const expectedResult = `BMI = ${resultCal} kg/m2 ${category}`;

        expect(actualResult).toContain(expectedResult);
    })
})