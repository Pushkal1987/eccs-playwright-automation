# ECCS Playwright Framework Dependency Map

## Current project dependency chain

.env
  -> src/config/env.ts
      -> src/config/users.ts
          -> src/tests/auth.setup.ts
              -> auth/*.json
                  -> role-based Playwright projects
                      -> test specs such as courierLogin.spec.ts, menuselection.flow.spec.ts, core.smoke.spec.ts
                          -> PageObjectsManager
                              -> BasePage
                                  -> LoginPage / MenuPage / DashBoardPage

## Essential file relationships

### 1) Runtime configuration
- [.env](.env)
  - Stores runtime values like BASE_URL, browser, environment, and role credentials.
  - This is the source of truth for the framework.

- [src/config/env.ts](src/config/env.ts)
  - Reads and validates required variables from [.env](.env).
  - Exposes them through the `env` object.
  - Required if a variable name or required key changes.

- [src/config/users.ts](src/config/users.ts)
  - Maps each role to credentials and the storage-state path used for auth reuse.
  - Example: `COURIER -> auth/courier.json`.
  - This file must change when adding a new role or changing storage-file names.

### 2) Authentication and session reuse
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
  - Logs in with a chosen role and saves the browser storage state.
  - This file drives the authenticated project flow for each role.

- [auth](auth)
  - Directory for saved browser contexts produced after successful login.
  - These files are reused by role-specific projects to avoid repeated login.

### 3) Playwright configuration and project setup
- [playwright.config.ts](playwright.config.ts)
  - Controls testDir, timeouts, reporters, and role-based projects.
  - Uses `env.baseUrl` and storage state for each role.
  - Defines the setup, role, and business-flow projects.

### 4) Page object structure
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
  - Central factory for page objects.
  - Used to prevent repeated object creation in tests.

- [src/pages/BasePage.ts](src/pages/BasePage.ts)
  - Shared browser actions such as navigation, click, fill, hover, and waits.
  - All page objects inherit from this base class.

- [src/pages/LoginPage.ts](src/pages/LoginPage.ts)
  - Login actions and selectors.

- [src/pages/MenuPage.ts](src/pages/MenuPage.ts)
  - Main menu, sub-menu, and optional sub-sub-menu interaction logic.

- [src/pages/DashBoardPage.ts](src/pages/DashBoardPage.ts)
  - Dashboard wait and title assertions.

### 5) Test suite and reporting
- [src/fixtures/BaseTest.ts](src/fixtures/BaseTest.ts)
  - Common Playwright fixture with shared setup and failure logging.
  - Used across the project for consistent test behavior.

- [src/utils/LoggerUtils.ts](src/utils/LoggerUtils.ts)
  - Custom logger writing to console and log files.

- [src/hooks/testHooks.ts](src/hooks/testHooks.ts)
  - Cleans error strings before logging.

## Current suite structure

The current maintained suite is:
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
- [src/tests/courierLogin.spec.ts](src/tests/courierLogin.spec.ts)
- [src/tests/menuselection.flow.spec.ts](src/tests/menuselection.flow.spec.ts)
- [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts)

The exploratory files that were previously used for quick validation were removed from the maintained suite. This keeps the project aligned to a more stable smoke and regression pattern.

## When to update which file

### If you change runtime values in .env
Check:
1. [.env](.env)
2. [src/config/env.ts](src/config/env.ts)
3. [src/config/users.ts](src/config/users.ts)
4. [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
5. [playwright.config.ts](playwright.config.ts)

### If you add a new role
Update:
- [.env](.env)
- [src/config/env.ts](src/config/env.ts)
- [src/config/users.ts](src/config/users.ts)
- [playwright.config.ts](playwright.config.ts)
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)

### If you add a new page or UI flow
Update:
- [src/pages](src/pages)
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
- relevant spec under [src/tests](src/tests)

### If app URLs or menu paths change
Update:
- [src/constants/routes.ts](src/constants/routes.ts)
- impacted page objects
- affected test specs

## Quick rule

- .env = runtime values
- config files = setup and user mapping
- auth setup = role login and session creation
- page objects = UI actions
- tests = business validation
- logs and reports = debugging and evidence

## Root files

### [package.json](package.json)
- Declares Playwright, Allure, dotenv, winston, and other runtime dependencies.

### [tsconfig.json](tsconfig.json)
- TypeScript compiler and project rules.

### [playwright.config.ts](playwright.config.ts)
- Global Playwright settings, reporters, and project graph.

### [FRAMEWORK_NOTES.md](FRAMEWORK_NOTES.md)
- Developer-level overview of the framework design.

### [FRAMEWORK_SIMPLE_GUIDE.md](FRAMEWORK_SIMPLE_GUIDE.md)
- Short onboarding guide for the project.

### [FRAMEWORK_DEPENDENCY.md](FRAMEWORK_DEPENDENCY.md)
- Dependency map used to understand which files must stay aligned.

## Summary

The framework is now centered on a stable pattern:
- centralized environment setup
- shared page-object architecture
- trusted role-based auth state
- a defined smoke gate in [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts)
- a cleaner set of long-lived regression specs

This keeps the project maintainable without relying on ad hoc test files.
- Used by: [src/fixtures/BaseTest.ts](src/fixtures/BaseTest.ts), [src/pages/MenuPage.ts](src/pages/MenuPage.ts), [src/tests/auth.setup.ts](src/tests/auth.setup.ts), [src/utils/RoleContextUtils.ts](src/utils/RoleContextUtils.ts)
- If changed: logs and debugging behavior change across the framework.

### [src/utils/RoleContextUtils.ts](src/utils/RoleContextUtils.ts)
- Purpose: creates role-specific browser context with storage state.
- Depends on: [src/config/users.ts](src/config/users.ts), [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
- Used by: menu flow tests and role-based tests.
- If changed: browser/session creation and role isolation change.

### [src/utils/CalendarUtils.ts](src/utils/CalendarUtils.ts)
- Purpose: calendar/date helper methods.
- Depends on: Playwright locator and expect
- Used by: date-picker or form validation tests.

### [src/utils/DateUtils.ts](src/utils/DateUtils.ts)
- Purpose: date utility methods.
- Depends on: JavaScript `Date` and `Intl`
- Used by: tests that require current date/time values.

### [src/utils/APIUtils.ts](src/utils/APIUtils.ts)
- Purpose: currently empty / placeholder for API helper code.
- Depends on: none yet.
- Used by: future API-based test utilities.

### [src/utils/JsonReaderUtils.ts](src/utils/JsonReaderUtils.ts)
- Purpose: placeholder for JSON file readers.
- Depends on: none yet.
- Used by: future data-driven tests.

## Test-data folder

### [src/test-data/LoginData.ts](src/test-data/LoginData.ts)
- Purpose: placeholder for login test data.
- Depends on: none yet.
- Used by: future data-driven login tests.

## Summary of biggest dependencies

- [.env](.env)
  -> [src/config/env.ts](src/config/env.ts)
  -> [src/config/users.ts](src/config/users.ts)
  -> [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
   -> browser session (auth)
  -> tests

- [playwright.config.ts](playwright.config.ts)
  -> controls all projects and baseURL
  -> uses environment data and auth state

- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
  -> central object creator for page objects

- [src/pages/BasePage.ts](src/pages/BasePage.ts)
  -> reusable base actions for all pages

- [src/utils/LoggerUtils.ts](src/utils/LoggerUtils.ts)
  -> shared logging across framework

---

## Final rule
When changing any file, check the files that directly import or depend on it.
The most important dependency chain in this project is:

.env -> env.ts -> users.ts -> auth.setup.ts -> storageState -> page objects/tests

This is the main chain that keeps the framework working together.
