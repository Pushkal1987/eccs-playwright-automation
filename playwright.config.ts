import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
import { env } from "./src/config/env";

export default defineConfig({

  // Test Directory
  testDir: './src/tests',

  fullyParallel: false,
  timeout: 30_000,
  expect: { timeout: 10_000 },

  retries: 0,
  //retries: process.env.CI ? 2 : 0,  // FOr CI/Jenkins 

  workers: 1,
  //workers: process.env.CI ? 1 : undefined,  // FOr CI/Jenkins 

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
        Browser: process.env.BROWSER,  // extract this data from .env file to hide details 
        Environment: process.env.ENVIRONMENT,
        Application: process.env.APPLICATION,
        QA_Engineer: process.env.QA_ENGINEER,
        Base_URL: process.env.BASE_URL
      }
    }]
  ],

  use: {
    baseURL: env.baseUrl,
    // browserName: 'chromium', 
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
    headless: true,
    // headless: process.env.CI === 'true', // FOr CI/Jenkins 
    screenshot: 'only-on-failure', // Capture screenshot 
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [

    // Authentication setup
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },

    // Courier tests - reuse authenticated session
    {
      name: 'courier',
      dependencies: ['setup'],
      testMatch: /courier.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/courier.json'
      },
    },

    // Custodian tests - reuse authenticated session
    { 
      name: 'custodian', 
      dependencies: ['setup'], 
      testMatch: /.*\.custodian\.spec\.ts/, 
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/custodian.json' 
      } 
    },

    // ACDC tests - reuse authenticated session
    { 
      name: 'acdc', 
      dependencies: ['setup'], 
      testMatch: /.*\.acdc\.spec\.ts/, 
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/acdc.json' 
      } 
    },

    // AO tests - reuse authenticated session
    { 
      name: 'ao', 
      dependencies: ['setup'], 
      testMatch: /.*\.ao\.spec\.ts/, 
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/ao.json' 
      } 
    },

    // Inspector tests - reuse authenticated session
    { 
      name: 'inspector', 
      dependencies: ['setup'], 
      testMatch: /.*\.inspector\.spec\.ts/, 
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/inspector.json' 
      } 
    },

    // End-2-End tests 
    { 
      name: 'BusinessFlow', 
      dependencies: ['setup'], 
      testMatch: /.*\.flow\.spec\.ts/, 
      use: { 
        ...devices['Desktop Chrome'],
        // Authentication is handled inside the E2E test for each role. 
      } 
    },

    // Other Chromium tests
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
      ],

      use: {
        ...devices['Desktop Chrome']
      },
    },
    
    // Future 
    // { 
    //     name: 'Firefox', 
    //     use: { ...devices['Desktop Firefox'] } 
    // }, 
    // { 
    //     name: 'WebKit', 
    //     use: { ...devices['Desktop Safari'] } 
    // } 
  ],
}); 