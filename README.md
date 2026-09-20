# ECCS Playwright Automation

Playwright TypeScript automation framework for the ECCS application.

This project is designed to automate end-to-end browser flows for different ECCS user roles, including Courier, Custodian, ACDC, AO, and Inspector. It uses Playwright's TypeScript support with environment-based configuration, role-specific authentication, and rich reporting via HTML and Allure.

## Features

- Playwright + TypeScript setup for browser automation
- Role-based test projects for multiple ECCS users
- Centralized environment configuration via `.env`
- Authentication state management using Playwright storage state
- HTML reporting and Allure integration
- Support for smoke and regression execution patterns

## Project Structure

```text
.
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
├── tests/
│   └── example.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js 18+
- npm
- A browser supported by Playwright (Chromium is configured by default)

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root and add the required ECCS variables:

```env
BASE_URL=https://your-eccs-url

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

Note: The project is configured to fail immediately if required environment variables are missing.

## Running Tests

Run the full suite:

```bash
npm test
```

Run in headed mode:

```bash
npm run headed
```

Run in debug mode:

```bash
npm run debug
```

Open Playwright Test UI:

```bash
npm run ui
```

Run smoke tests only:

```bash
npm run smoke
```

## Reports

This project is configured to generate the following reports:

- HTML report in `playwright-report/`
- Allure report via `allure-results/` and `allure-report/`

Generate and open the Allure report:

```bash
npm run allureReport
```

Open the generated Allure report manually:

```bash
npm run openAllureReport
```

## Test Configuration Highlights

The Playwright config includes:

- `testDir: ./src/tests`
- Role-specific projects for authentication-based flows
- Browser setup using `Desktop Chrome`
- Screenshots and traces captured on failure
- HTML and Allure report generation

## Notes

- Tests are organized by business role and flow patterns.
- Authentication state is stored per role under `.auth/` during setup.
- The project is intended for QA automation and regression coverage for ECCS user workflows.

## License

This project uses the ISC license as defined in `package.json`.

## Author

Pushkal R. Shripad
