import { Locator, Page } from "@playwright/test";

export class HorizoltalSliderPage {

    readonly page: Page;
    readonly slider: Locator;
    readonly range: Locator;

    constructor(page: Page) {
        this.page = page;
        this.slider = page.getByRole('slider');
        this.range = page.locator('span[id="range"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    }

    async getRange(): Promise<number> {
        return Number(await this.range.textContent());
    }

    async fillOnSlider(fillValue: number) {
        await this.slider.fill(fillValue.toString());
    }

    async pressOnSlider(sliderValue: number) {

        let range = Number(await this.range.textContent());

        while (range !== sliderValue) {
            await this.slider.press('ArrowRight');
            await this.page.waitForTimeout(100);

            range = Number(await this.range.textContent());
        }
    }

    async pressOnSliderUsingForLoop(rangeValue: number) {

        for (let index = 0; index < rangeValue;) {
            await this.slider.press('ArrowRight');
            await this.page.waitForTimeout(100);
            index = index + 0.5;
        }
    }

}