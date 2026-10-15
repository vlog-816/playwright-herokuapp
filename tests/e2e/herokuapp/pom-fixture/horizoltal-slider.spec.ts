import { test, expect } from '../fixtures/haroku.fixture.ts';

test('Press on horizoltal slider', async ({ horizoltalSliderPage }) => {

    const fillValue = 3;
    const sliderValue = 4.5;

    await horizoltalSliderPage.goto();
    await horizoltalSliderPage.fillOnSlider(3);
    expect(await horizoltalSliderPage.getRange()).toBe(fillValue);

    await horizoltalSliderPage.pressOnSlider(sliderValue);
    expect(await horizoltalSliderPage.getRange()).toBe(sliderValue);
})

test('Press on horizoltal slider using for loop', async ({ horizoltalSliderPage }) => {

    const rangeValue = 2.5;

    await horizoltalSliderPage.goto();
    await horizoltalSliderPage.pressOnSliderUsingForLoop(rangeValue);
    expect(await horizoltalSliderPage.getRange()).toBe(rangeValue);

})