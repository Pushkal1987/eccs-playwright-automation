# ECCS Playwright Automation

[![Playwright Tests](https://github.com/Pushkal1987/eccs-playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Pushkal1987/eccs-playwright-automation/actions/workflows/playwright.yml)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Built with TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A maintainable Playwright and TypeScript end-to-end automation framework for the ECCS application.

This project automates key business flows for ECCS users across multiple roles, including Courier, Custodian, ACDC, AO, and Inspector. It is structured for readability, maintainability, and CI-friendly execution with reusable page objects, fixtures, managers, and role-based authentication.

## Contents

- [Highlights](#highlights)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment configuration](#environment-configuration)
- [Running tests](#running-tests)
- [Reports and debugging](#reports-and-debugging)
- [CI](#ci)
- [Contributing](#contributing)
- [License](#license)

## Highlights

- TypeScript-based Playwright automation framework
- Role-specific projects with setup dependencies
- Reusable page-object model and workflow managers
- Centralized `.env` configuration and validation
- Secure auth-state handling with Playwright storageState
- HTML and Allure reporting for diagnostics and traceability
- Smoke test support with the `@smoke` tag
- Automated browser execution with failure capture for screenshots, traces, and videos

## Technology stack

- Playwright Test
- TypeScript
- Node.js + npm
- Allure via `allure-playwright`
- dotenv, Faker, Winston, and XLSX

## Project structure

Detailed architecture guidance is available in [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md).

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   └── PROJECT-STRUCTURE.md
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── constants/
│   ├── fixtures/
│   ├── hooks/
│   ├── managers/
│   ├── pages/
│   ├── test-data/
│   ├── tests/
│   └── utils/
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── package-lock.json
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- Chromium browser support via Playwright
- Access to the ECCS application and valid test credentials

### Install dependencies

```bash
npm ci
npx playwright install --with-deps chromium
```

## Environment configuration

Create a `.env` file in the project root with the required ECCS settings:

```env
BASE_URL=https://your-eccs-environment.example.com

COURIER_USERNAME=your_courier_username
COURIER_PASSWORD=your_courier_password

CUSTODIAN_USERNAME=your_custodian_username
CUSTODIAN_PASSWORD=your_custodian_password

ACDC_USERNAME=your_acdc_username
ACDC_PASSWORD=your_acdc_password

AO_USERNAME=your_ao_username
AO_PASSWORD=your_ao_password

INSPECTOR_USERNAME=your_inspector_username
INSPECTOR_PASSWORD=your_inspector_password
```

The project validates required environment variables at startup and fails early if any are missing.

## Running tests

```bash
# Full suite
npm test

# Explicit regression command
npm run regression

# Run with visible browser
npm run headed

# Launch in debug mode
npm run debug

# Open Playwright UI mode
npm run ui

# Run smoke tests only
npm run smoke
```

This project is configured around Playwright projects such as:

- `setup`
- `courier`
- `custodian`
- `acdc`
- `ao`
- `inspector`
- `BusinessFlow`
- `Chromium`

## Reports and debugging

The framework produces:

- Playwright HTML report in `playwright-report/`
- Allure results in `allure-results/`
- Allure report in `allure-report/`
- Screenshots, traces, and videos for failed executions

Generate and open the Allure report:

```bash
npm run allureReport
```

Open Playwright's report viewer:

```bash
npx playwright show-report
```

## CI

This repository includes a GitHub Actions workflow in `.github/workflows/playwright.yml` that runs the Playwright suite on push, pull_request, and manual dispatch.

Before enabling the workflow in GitHub, add these repository secrets:

- `BASE_URL`
- `COURIER_USERNAME`, `COURIER_PASSWORD`
- `CUSTODIAN_USERNAME`, `CUSTODIAN_PASSWORD`
- `ACDC_USERNAME`, `ACDC_PASSWORD`
- `AO_USERNAME`, `AO_PASSWORD`
- `INSPECTOR_USERNAME`, `INSPECTOR_PASSWORD`

The workflow uploads Playwright report artifacts, test results, and Allure results even when tests fail.

## Contributing

1. Create a feature branch for your changes.
2. Keep test selectors and UI interactions within page objects.
3. Use managers for multi-step business flows.
4. Add or update tests whenever application behavior changes.
5. Run the relevant suite locally before opening a pull request.
6. Never commit credentials, generated reports, or auth state artifacts.

## License

This project uses the ISC license. See [`package.json`](package.json) for package metadata.

## Author

Pushkal R. Shripad
