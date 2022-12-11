import test from "@playwright/test";
const os = require('os');
const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
import { userData } from '../helper/loginData';
import LoginPage from '../pages/loginPage';
const { chromium } = require('playwright');
const path = require('path');




test.describe('audit', () => {
  // test.use({
  //   storageState: "./auth.json"
  // })
  test('shoud pass audit After login performance test', async ({ playwright }) => {
    const userDataDir = path.join(os.tmpdir(), '..', String(Math.random()));
    const context = await chromium.launchPersistentContext(userDataDir, {
      args: ['--remote-debugging-port=9223'],
    });


    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
    const loginPage = new LoginPage(page)
    await loginPage.userNameFill(userData.performance_glitch)
    await loginPage.userPasswordFill(userData.correctPassword)
    await loginPage.loginButtonClick()
    await loginPage.burgerMenuClick()
    await loginPage.aboutButtClick()

    await playAudit({
      disableStorageReset: true,
      url: 'https://www.saucedemo.com/inventory.html',
      page: page,
      thresholds: {
        performance: 20
      },
      port: 9223,
      reports: {
        formats: {
          html: true
        },
        name: `afterLoginPerformance_report`, //defaults to `lighthouse-${new Date().getTime()}`
        directory: `./audit_report`, //defaults to `${process.cwd()}/lighthouse`
      },
    });

    await context.close();
  });
});