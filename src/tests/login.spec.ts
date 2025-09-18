import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { users, PASSWORD, User } from '../test-data/users';

test.describe('Login Functionality', () => {
  for (const [key, user] of Object.entries(users)) {
    test(`login with ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.loginAs(user.username, PASSWORD);

      if (user.expectedSuccess) {
        await test.step('Assert successful login', async () => {
          await loginPage.expectRedirectInventory();
          const inventoryPage = new InventoryPage(page);
          await inventoryPage.waitForLoad();
        });
      } else {
        await test.step('Assert failed login', async () => {
          // TS guarantees errorMessage exists for failing users
          await loginPage.expectError(user.errorMessage);
        });
      }
    });
  }
});

test.describe('Performance Observation', () => {
  test('Performance observation for performance_glitch_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    const user: User = users.performance; // strongly typed

    const startTime = performance.now();

    await loginPage.loginAs(user.username, PASSWORD);
    await inventoryPage.waitForLoad();

    const loadTime = performance.now() - startTime;

    console.log(`Page load time for ${user.username}: ${loadTime} ms`);
  });
});
