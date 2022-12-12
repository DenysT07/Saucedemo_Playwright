import { expect, Locator, Page } from '@playwright/test';
const userNameFieldLoc = '[id="user-name"]'
const passwordFieldLoc = '[id="password"]'
const loginButtonLoc = '[id="login-button"]'
const errorloc = '[data-test="error"]'
const headerLoc = '[class="title"]'
const burgerMenue = '[id="react-burger-menu-btn"]'
const aboutButtonLoc = '[id="about_sidebar_link"]'

export default class LoginPage{
 
    constructor(public page: Page){
    }

    async goToBaseURL(){
        await this.page.goto('/')
    }

    async userNameFill(value: string){
        await this.page.locator(userNameFieldLoc).fill(value);
    }

    async userPasswordFill(value: string){
        await this.page.locator(passwordFieldLoc).fill(value);
    }

    async loginButtonClick(){
        await this.page.locator(loginButtonLoc).click();
    }

    async expectErrorToHaveText(text: string){
        await expect(this.page.locator(errorloc)).toHaveText(text);
    }

    async expectHeaderToHaveText(text: string){
        await expect(this.page.locator(headerLoc)).toHaveText(text);
    }

    async burgerMenuClick() {
        await this.page.locator(burgerMenue).click()
    }

    async aboutButtClick(){
        await this.page.locator(aboutButtonLoc).click()
    }

}