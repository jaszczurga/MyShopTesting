import { defineConfig, devices } from '@playwright/test';


require('dotenv').config()

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    //allure generate allure-results -o allure-report --clean
    // allure open allure-report
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    //headless: false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      testMatch:'mainPageNotLoggedIn.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'authSetup',
      testMatch:'auth.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mainPageLogged',
      testMatch:'mainPageLoggedIn.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies:['authSetup']
    },
    {
      name: 'chatTesting',
      testMatch:'chatTesting.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies:['authSetup']
    },
    {
      name: 'cartTesting',
      testMatch:'cartTesting.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies:['authSetup']
    },
    {
      name: 'myProductsTesting',
      testMatch:'productManagementTesting.spec.ts',
      use: { ...devices['Desktop Chrome'] },
      dependencies:['authSetup']
    },
    // {
    //   name: 'authUserSetup',
    //   grep: /@userSetup/,
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'authAdminSetup',
    //   grep: /@adminSetup/,
    //   use: { ...devices['Desktop Chrome'] },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'https://playwright.dev/',
  //   reuseExistingServer: !process.env.CI,
  // },
});
