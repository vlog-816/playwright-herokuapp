import { test as base, expect } from '@playwright/test';
import { BmiPage } from '../pages/BmiPage.page';

type BMIPage = {
    bmiPage: BmiPage
}

export const test = base.extend<BMIPage>({
    bmiPage: async ({ page }, use) => {
        await use(new BmiPage(page))
    }
})

export { expect } 