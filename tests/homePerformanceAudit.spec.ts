import test from "@playwright/test";
const os = require('os');
const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
const { chromium } = require('playwright');
const path = require('path');




test.describe('audit example', () => {
  // test.use({
  //   storageState: "./auth.json"
  // })
  test('open browser', async ({ playwright }) => {
    const userDataDir = path.join(os.tmpdir(), '..', String(Math.random()));
    const context = await chromium.launchPersistentContext(userDataDir, {
      args: ['--remote-debugging-port=9221'],
    });


    const page = await context.newPage();


    await playAudit({
      disableStorageReset: true,
      url: 'https://www.saucedemo.com',
      page: page,
      thresholds: {
        performance: 80
      },
      port: 9221,
      reports: {
        formats: {
          html: true
        },
        name: `homePerformance_report`, //defaults to `lighthouse-${new Date().getTime()}`
        directory: `./audit_report`, //defaults to `${process.cwd()}/lighthouse`
      },
    });

    await context.close();
  });
});