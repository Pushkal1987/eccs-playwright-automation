# ECCS Playwright Framework - Simple Guide

## 1. Big picture
This project follows a Playwright Page Object Model structure with centralized configuration, reusable page classes, and role-based session reuse.

- Config files define the runtime and project behavior
- Page objects define UI interactions
- The manager gives access to those page objects
- The setup file logs in once and saves browser state
- The smoke test acts as the first stable validation on the current app flow

---

## 2. Main file flow

### A. Environment and setup
- [.env](.env)
  - stores runtime values like URL, usernames, passwords, environment, and browser settings

- [src/config/env.ts](src/config/env.ts)
  - reads and validates the required variables from [.env](.env)
  - exposes values like `env.baseUrl` and `env.courier.username`

- [src/config/users.ts](src/config/users.ts)
  - maps each role to a username, password, and storage-state file
  - example: `COURIER -> auth/courier.json`

- [playwright.config.ts](playwright.config.ts)
  - defines Playwright projects, reporters, browser settings, and auth-state reuse

### B. Reusable page layer
- [src/pages/BasePage.ts](src/pages/BasePage.ts)
  - shared actions such as navigation, click, fill, hover, and wait logic

- [src/pages/LoginPage.ts](src/pages/LoginPage.ts)
  - login flow and selectors

- [src/pages/MenuPage.ts](src/pages/MenuPage.ts)
  - menu navigation across main and nested menus

- [src/pages/DashBoardPage.ts](src/pages/DashBoardPage.ts)
  - dashboard validation and readiness checks

### C. Manager and fixtures
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
  - central access point for page objects

- [src/fixtures/BaseTest.ts](src/fixtures/BaseTest.ts)
  - custom fixture for common setup and failure handling

### D. Auth and session reuse
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
  - performs the login flow for each role
  - saves the authenticated browser state in the auth folder

- [auth](auth)
  - stores the role-specific storage state files used by test projects

### E. Current tests and smoke coverage
- [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts)
  - current smoke test for the dashboard-after-auth flow

- [src/tests/courierLogin.spec.ts](src/tests/courierLogin.spec.ts)
  - courier-focused validation

- [src/tests/menuselection.flow.spec.ts](src/tests/menuselection.flow.spec.ts)
  - menu navigation flow validation

### F. Logging and utilities
- [src/utils/LoggerUtils.ts](src/utils/LoggerUtils.ts)
  - logs test flow and errors

- [src/utils/RoleContextUtils.ts](src/utils/RoleContextUtils.ts)
  - helps create isolated browser contexts for role-based tests

- [src/hooks/testHooks.ts](src/hooks/testHooks.ts)
  - cleans error output before logging

---

## 3. Current dependency chain

.env
  -> src/config/env.ts
      -> src/config/users.ts
          -> src/tests/auth.setup.ts
              -> auth/*.json
                  -> role projects in playwright.config.ts
                      -> specs in src/tests
                          -> page objects through PageObjectsManager

### Real-world example
- Update values in [.env](.env)
- [src/config/env.ts](src/config/env.ts) reads them
- [src/config/users.ts](src/config/users.ts) uses them to build role objects
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts) logs in and saves state
- Playwright reuses that state for later test execution

---

## 4. When to update which file

### If you change only values in .env
Usually no code change is needed beyond the value itself.

Examples:
- BASE_URL
- COURIER_PASSWORD
- AO_USERNAME

### If you change variable names in .env
Update:
- [.env](.env)
- [src/config/env.ts](src/config/env.ts)
- [src/config/users.ts](src/config/users.ts)

### If you add a new role
Update:
- [.env](.env)
- [src/config/env.ts](src/config/env.ts)
- [src/config/users.ts](src/config/users.ts)
- [playwright.config.ts](playwright.config.ts)
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)

### If app URLs change
Update:
- [.env](.env)
- [src/constants/routes.ts](src/constants/routes.ts)
- the page objects and related specs

---

## 5. Why this structure is good
- Clear separation of setup, UI actions, and business flow
- Less repeat code through reusable page logic
- Stable auth flow via saved browser state
- Easier debugging with logs and reports
- Cleaner smoke and regression coverage for real workflow validation

---

## 6. Quick rule
- Config files = settings
- Page files = UI interaction
- Manager file = object access
- Setup file = login + auth-state generation
- Tests = validation of business flow
- Utility files = logging and support logic

---

## 7. Most important files to remember
- [.env](.env)
- [src/config/env.ts](src/config/env.ts)
- [src/config/users.ts](src/config/users.ts)
- [src/tests/auth.setup.ts](src/tests/auth.setup.ts)
- [playwright.config.ts](playwright.config.ts)
- [src/pages/BasePage.ts](src/pages/BasePage.ts)
- [src/pages/LoginPage.ts](src/pages/LoginPage.ts)
- [src/pages/MenuPage.ts](src/pages/MenuPage.ts)
- [src/managers/PageObjectsManager.ts](src/managers/PageObjectsManager.ts)
- [src/tests/core.smoke.spec.ts](src/tests/core.smoke.spec.ts)

This is the short list to keep in mind when you add new data, roles, or test flows.
