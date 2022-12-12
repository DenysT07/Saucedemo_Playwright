import { test, expect } from '@playwright/test';
import { userData } from '../helper/loginData';
import LoginPage from '../pages/loginPage';
const playwright = require('playwright');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Login Test', () => {
  test('Should login using standart User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.standart)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectHeaderToHaveText('Products')
  });
  
  test('Should login using locked out User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.locked_out)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Sorry, this user has been locked out.')
  });
  test('Should login using problem User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.problem)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectHeaderToHaveText('Products')
  });
  test('Should login using performance glitch User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.performance_glitch)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectHeaderToHaveText('Products')
    
  });
  test('Should login with valid User Name and incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.standart)
    await loginPage.userPasswordFill(userData.incorrectPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Username and password do not match any user in this service')

  });
  test('Should login with valid User Name and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.incorrect)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Username and password do not match any user in this service')

  });
  test('Should login with valid User Name and invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.incorrect)
    await loginPage.userPasswordFill(userData.incorrectPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Username and password do not match any user in this service')
  });
});