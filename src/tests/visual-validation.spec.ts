import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const users = ['standard_user', 'visual_user'];

test.describe('Visual Validation - Inventory Page', () => {
  for (const user of users) {
    test(`Visual snapshot comparison for user: ${user}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(user, 'secret_sauce');
      await loginPage.expectRedirectInventory();

      await expect(page).toHaveScreenshot(`inventory-${user}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
