# ECCS Playwright Framework Notes

## 1. Overview
This project is a Playwright + TypeScript automation framework for the ECCS application. It follows a Page Object Model (POM) pattern, centralizes environment configuration, uses role-based browser storage, and keeps test execution consistent through shared fixtures and logs.

## 2. Current project structure

### Configuration and setup
- [playwright.config.ts](playwright.config.ts)
  - Main Playwright configuration.
  - Controls timeouts, reporters, browser settings, project definitions, and auth-state reuse.

- [src/config/env.ts](src/config/env.ts)
  - Reads variables from [.env](.env).
  - Validates required values before tests run.

- [src/config/users.ts](src/config/users.ts)
  - Maps each supported role to username, password, and storage-state path.
  - Current roles include COURIER, CUSTODIAN, ACDC, AO, and INSPECTOR.

- [src/constants/routes.ts](src/constants/routes.ts)
  - Keeps common navigation paths in one place.

### Core framework classes
- [src/pages/BasePage.ts](src/pages/BasePage.ts)
  - Shared actions such as navigation, click, fill, hover, and wait operations.

- [src/pages/LoginPage.ts](src/pages/LoginPage.ts)
  - Login flow and selectors.

- [src/pages/MenuPage.ts](src/pages/MenuPage.ts)
  - Main menu and nested menu selection logic.

- [src/pages/DashBoardPage.ts](src/pages/DashBoardPage.ts)
  - Dashboard readiness and heading validation.

### Manager and fixtures
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
  - Central access point for page objects.
  - Avoids repeated object creation inside tests.

- [src/fixtures/BaseTest.ts](src/fixtures/BaseTest.ts)
  - Shared Playwright fixture with logging and failure handling.

### Test setup and execution
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
  - Logs in using a role and saves browser storage state.

- [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts)
  - Current smoke test entry point.
  - Validates the post-login dashboard for the courier flow.

- [src/tests/courierLogin.spec.ts](src/tests/courierLogin.spec.ts)
  - Courier-specific login and page checks.

- [src/tests/menuselection.flow.spec.ts](src/tests/menuselection.flow.spec.ts)
  - Business flow test for menu navigation and destination validation.

### Support utilities
- [src/utils/LoggerUtils.ts](src/utils/LoggerUtils.ts)
  - Custom logger used across setup, pages, and tests.

- [src/utils/RoleContextUtils.ts](src/utils/RoleContextUtils.ts)
  - Utility for creating role-specific BrowserContext objects.

## 3. Why this structure is strong
- Separation of concerns between setup, page logic, and test flow
- Reusable base methods reduce duplication
- Role-based session reuse minimizes repeated login steps
- Logs and reports make failures easier to diagnose
- Smoke and regression coverage are easier to manage when the suite stays focused

## 4. Best practice for the current project
- Keep all credentials and app URLs in [.env](.env) and the config layer
- Use page objects instead of direct selectors in tests
- Keep business flows in dedicated specs under [src/tests](src/tests)
- Treat [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts) as the first validation gate
- Keep the suite lean and maintainable instead of adding ad hoc exploratory tests

## 5. Current dependency map

### Environment-driven dependencies
- [.env](.env)
  - Source of runtime values
- [src/config/env.ts](src/config/env.ts)
  - Reads and validates them
- [src/config/users.ts](src/config/users.ts)
  - Maps role values to credential objects and storage paths
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
  - Uses the role config to authenticate and save storage state
- [playwright.config.ts](playwright.config.ts)
  - Consumes the saved auth state for role project execution

### Page and test dependencies
- [src/pages/BasePage.ts](src/pages/BasePage.ts)
  - Shared base for all page interactions
- [src/pages/LoginPage.ts](src/pages/LoginPage.ts)
  - Login logic
- [src/pages/MenuPage.ts](src/pages/MenuPage.ts)
  - Navigation logic
- [src/pages/DashBoardPage.ts](src/pages/DashBoardPage.ts)
  - Dashboard validation
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
  - Creates and exposes the page objects

### Global dependencies
- [package.json](package.json)
  - Declares Playwright and supporting libraries
- [tsconfig.json](tsconfig.json)
  - TypeScript configuration used across the suite

## 6. Quick dependency rule

### If you change .env
Check these files:
1. [.env](.env)
2. [src/config/env.ts](src/config/env.ts)
3. [src/config/users.ts](src/config/users.ts)
4. [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
5. [playwright.config.ts](playwright.config.ts)

### If you change a page object
Check:
- the page class itself
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
- the related spec under [src/tests](src/tests)

### If you add a new role or new auth requirement
Check:
- [.env](.env)
- [src/config/env.ts](src/config/env.ts)
- [src/config/users.ts](src/config/users.ts)
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
- [playwright.config.ts](playwright.config.ts)

## 7. Recent project updates
- The suite was cleaned up to remove exploratory validation files that were not part of the maintained regression path.
- A dedicated smoke entry point was added at [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts).
- The framework continues to rely on the role-based auth state pattern for efficient and repeatable execution.

## 8. Quick usage rule
- Use page objects for UI actions
- Use the custom fixture for common test behavior
- Use auth setup for reusable role sessions
- Use the smoke test as the first confidence check
- Keep new tests aligned with the current project structure and naming pattern
