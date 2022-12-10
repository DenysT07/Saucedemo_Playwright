import { test, expect } from '@playwright/test';
import { userData } from '../helper/loginData';
import LoginPage from '../pages/loginPage';
const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
import perfConfig from 'lighthouse/lighthouse-core/config/perf-config.js';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.describe('Login Test', () => {
  test('login useing standart User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.standart)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectHeaderToHaveText('Products')
  });
  
  test('login useing locked out User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.locked_out)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Sorry, this user has been locked out.')
  });
  test('login useing problem User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.problem)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectHeaderToHaveText('Products')
  });
  test('login useing performance glitch User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.performance_glitch)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectHeaderToHaveText('Products')
    
  });
  test('login useing correct User Name and incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.standart)
    await loginPage.userPasswordFill(userData.incorrectPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Username and password do not match any user in this service')

  });
  test('login useing incorrect User Name and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.incorrect)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Username and password do not match any user in this service')

  });
  test('login useing incorrect User Name and incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.incorrect)
    await loginPage.userPasswordFill(userData.incorrectPassword)
    await loginPage.loginButtonClick()
    await loginPage.expectErrorToHaveText('Epic sadface: Username and password do not match any user in this service')

  });
});