import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly clickBtn: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.clickBtn = page.getByRole('button', { name: ' Login' });
        this.flashMessage = page.locator('#flash');
    }

    async goto(){
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async submitForm(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.clickBtn.click();
    }

    async getFlashMessage(){
        return this.flashMessage;
    }
}