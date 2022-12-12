import test from "@playwright/test";
const os = require('os');
const { playAudit } = require('playwright-lighthouse');
const {playwright, chromium} = require('playwright');
const path = require('path');
import { userData } from '../helper/loginData';
import LoginPage from '../pages/loginPage';

test.describe('audit', () => {

  test('shoud pass audit Accessibility test', async ({ playwright }) => {
    const userDataDir = path.join(os.tmpdir(), '..', String(Math.random()));
    const context = await chromium.launchPersistentContext(userDataDir, {
      args: ['--remote-debugging-port=9222'],
    });

    // const base
    const page = await context.newPage();
    await page.goto('/');
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.standart)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.burgerMenuClick()
    await loginPage.aboutButtClick()

    await playAudit({
      disableStorageReset: true,
      url: 'https://www.saucedemo.com/inventory.html',
      page: page,
      thresholds: {
        accessibility: 80
      },
      port: 9222,
      reports: {
        formats: {
          html: true
        },
        name: `accessibility_report`, 
        directory: `./playwright-report/audit_report`, 
      },
    });

    await context.close();
  });
});