import { test, expect } from '../fixtures/bmi.fixture.ts';

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
        age: ${age} gender: ${gender} height: ${height} weight ${weight}`, async ({ bmiPage }) => {

        await bmiPage.goto();
        await bmiPage.resetForm();
        await bmiPage.fillFormAndCalculate(age, gender, height, weight);

        const actualResult = await bmiPage.getResult();
        const expectedResult = bmiPage.calculateBMI(height, weight, category);

        expect(actualResult).toEqual(expectedResult);
    })
})