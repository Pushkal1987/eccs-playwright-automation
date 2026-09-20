# Project Structure and Architecture

This document explains how the ECCS Playwright automation framework is organized and how new code should fit into the existing design.

## Top-level layout

```text
.
├── .github/workflows/playwright.yml
├── docs/PROJECT-STRUCTURE.md
├── src/
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── package-lock.json
```

## Source folder structure

| Directory | Purpose | Typical contents |
| --- | --- | --- |
| `src/config` | Runtime configuration | `.env` loading, validation, and app config |
| `src/constants` | Shared constants | Role names, labels, URLs, selectors, and static values |
| `src/fixtures` | Test fixtures | Reusable Playwright fixtures and setup data |
| `src/hooks` | Lifecycle hooks | Setup/teardown utilities and authentication helpers |
| `src/managers` | Workflow orchestration | Multi-step business flows and orchestration logic |
| `src/pages` | Page Object Model | Locator definitions and page interactions |
| `src/test-data` | Test inputs | Static datasets, factories, and generated test data |
| `src/tests` | Test specifications | Scenario-based tests, grouped by flow or role |
| `src/utils` | Reusable helpers | Logging, formatting, file helpers, and shared operations |

## Execution flow

1. Playwright loads `playwright.config.ts`.
2. `src/config/env.ts` loads `.env` and validates required values.
3. The `setup` project prepares authentication state.
4. Role-specific projects load `.auth/<role>.json` for repeated execution.
5. Tests interact with page objects and managers.
6. The framework records assertions and publishes HTML/Allure reports.
7. Failed runs retain screenshots, traces, and videos for diagnosis.

## Playwright project model

The current configuration defines these project groups:

| Project | Purpose |
| --- | --- |
| `setup` | Prepares authentication state before role-based tests |
| `courier` | Runs Courier-specific specs |
| `custodian` | Runs Custodian-specific specs |
| `acdc` | Runs ACDC-specific specs |
| `ao` | Runs AO-specific specs |
| `inspector` | Runs Inspector-specific specs |
| `BusinessFlow` | Executes business-flow scenarios |
| `Chromium` | Runs general browser tests while excluding role-specific flows |

## Recommended layering

### Page objects

Keep selectors and UI actions inside the page object classes under `src/pages`. This keeps tests readable and avoids duplication.

### Managers

Use `src/managers` for flows that span multiple pages or multiple business actions. Managers should be the reusable orchestration layer between tests and pages.

### Fixtures

Use fixtures for any shared test context, authentication, or reusable dependencies. This reduces boilerplate across test files.

### Tests

Keep test files focused on business scenarios and assertions. They should remain high-level and readable, not a dump of UI interactions.

Example naming patterns include:

```text
courierLogin.spec.ts
shipment.custodian.spec.ts
inspection.inspector.spec.ts
order.flow.spec.ts
```

## Configuration and secrets

Environment variables are enforced in `src/config/env.ts` and must include:

- `BASE_URL`
- `COURIER_USERNAME`, `COURIER_PASSWORD`
- `CUSTODIAN_USERNAME`, `CUSTODIAN_PASSWORD`
- `ACDC_USERNAME`, `ACDC_PASSWORD`
- `AO_USERNAME`, `AO_PASSWORD`
- `INSPECTOR_USERNAME`, `INSPECTOR_PASSWORD`

These values should be provided in a local `.env` file and in GitHub repository secrets during CI.

## Diagnostics and reporting

The framework is configured to:

- open the HTML report on failure
- capture screenshots only on failed tests
- retain traces for failed runs
- retain videos for failed runs
- publish Allure environment metadata

Generated folders such as `playwright-report/`, `test-results/`, `allure-results/`, and `.auth/` should remain untracked and not committed.

## Adding a new role or flow

1. Add the relevant credentials to `.env` and GitHub secrets.
2. Extend `src/config/env.ts` with the required variables.
3. Add or update the login/setup flow for that role.
4. Adjust `playwright.config.ts` to include the new project or naming pattern.
5. Add page objects and managers where applicable.
6. Write the corresponding tests under `src/tests`.
7. Update documentation and CI requirements.

## Quality checklist

Before opening a PR:

```bash
npm ci
npx playwright install chromium
npx tsc --noEmit
npm test
```

Review the Playwright HTML report and Allure output to validate failed scenarios quickly.
