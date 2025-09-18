# Saucedemo E2E Testing with Playwright

## Overview

This project contains automated end-to-end tests using Playwright to validate the Saucedemo web application. It covers functional login scenarios, inventory page validations, sorting features, visual regression, and performance observations.

***

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Compatible web browser (Chromium, Firefox, WebKit supported by Playwright)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nurnadianovsham/sasaucedemo-e2e-testing
cd saucedemo-e2e-testing
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

***

## Running Tests

Run all tests with:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test src/tests/login.spec.ts
```

Generate and open the HTML report after test run:

```bash
npx playwright show-report
```

***

## Test Strategy and Structure

- **Page Object Model (POM) pattern:** Encapsulates page selectors and actions in dedicated classes under `src/pages/` for maintainability and reuse.
- **Test Data Management:** User credentials and expected results are stored in `src/test-data/users.ts` for clean separation from page and test logic.
- **Tests:** Defined primarily under `src/tests/` with separate files for login, inventory, performance, and visual validation testing.
- **Locator Choices:** Locators prioritize stable selectors such as:
  - Data-test attributes (e.g., `[data-test="product-sort-container"]`)
  - Playwright's getByPlaceholder() to locate input elements by their placeholder text (e.g., "Username", "Password") in login forms, improving readability and resilience where explicit labels or IDs are absent.
  - CSS class selectors scoped inside page objects
  - Avoid brittle role or text-based locators when direct selectors exist

***

## Visual Testing

- Screenshots captured for key pages comparing different user experiences.
- Baseline snapshots stored beside tests under `__screenshots__`.
- Use Playwright's `toHaveScreenshot()` with disabled animations and shadows for stable image comparison.

***

## Performance Testing

- Measures page load times for specific users (e.g., `performance_glitch_user`).
- Logs detailed timing, network failures, and UI delays during navigation.
