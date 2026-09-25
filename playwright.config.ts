import * as os from 'node:os';
import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';
import reportingLabs from './reporting-labs.config';
/*
const roleProjects = [
  { name: 'courier', match: /courier.*\.spec\.ts/ },
  { name: 'custodian', match: /.*\.custodian\.spec\.ts/ },
  { name: 'acdc', match: /.*\.acdc\.spec\.ts/ },
  { name: 'ao', match: /.*\.ao\.spec\.ts/ },
  { name: 'inspector', match: /.*\.inspector\.spec\.ts/ },
  { name: 'superintendent', match: /.*\.superintendent\.spec\.ts/ },
] as const;
*/

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: 0,
  workers: 1,

  reporter: [
    ['list'],
    ['html', {
      open: 'on-failure',
      title: 'ECCS Playwright Automation Report',
      outputFolder: 'playwright-report',
    }],
    ['allure-playwright', {
      environmentInfo: {
        OS: os.platform(),
        OS_Version: os.release(),
        Node_Version: process.version,
        Browser: process.env.BROWSER,
        Environment: process.env.ENVIRONMENT,
        Application: process.env.APPLICATION,
        QA_Engineer: process.env.QA_ENGINEER,
        Base_URL: process.env.BASE_URL,
      },
    }],
    ['reporting-labs', reportingLabs]
  ],

  use: {
    baseURL: env.baseUrl,
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

  ]

  /*
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    ...roleProjects.map(({ name, match }) => ({
      name,
      dependencies: ['setup'],
      testMatch: match,
      use: {
        ...devices['Desktop Chrome'],
        storageState: `auth/${name}.json`,
      },
    })),
    {
      name: 'BusinessFlow',
      dependencies: ['setup'],
      testMatch: /.*\.(flow)\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/courier.json',
      },
    },
    {
      name: 'Chromium',
      dependencies: ['setup'],
      testIgnore: [
        /courierLogin\.spec\.ts/,
        /.*\.flow\.spec\.ts/,
        /.*\.custodian\.spec\.ts/,
        /.*\.acdc\.spec\.ts/,
        /.*\.ao\.spec\.ts/,
        /.*\.inspector\.spec\.ts/,
        /.*\.(flow|smoke)\.spec\.ts/,
      ],
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  */
});