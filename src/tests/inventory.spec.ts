import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { users, PASSWORD, INVENTORY_URL, BASE_URL, ABOUT_URL } from '../test-data/users';

test.describe('Inventory Page Validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(users.standard.username, PASSWORD);
    await expect(page).toHaveURL(INVENTORY_URL);
  });

  test('Verify all products are listed with visible name, price, and image', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForLoad();

    await test.step('Verify product count', async () => {
      await inventoryPage.verifyAllProductsListed(6);
    });

    await test.step('Assert product names, prices, and images are visible and valid', async () => {
      await inventoryPage.assertProductDetailsVisible();
    });
  });

  test('Sorting products by Name A-Z updates product order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('Name (A to Z)');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('Sorting products by Price Low-High updates product order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('Price (low to high)');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Clicking a product navigates to the detail page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const names = await inventoryPage.getProductNames();
    await inventoryPage.clickProductByName(names[0]);
    await inventoryPage.expectProductDetailPage(names[0]);
  });

  test('Logout returns to login page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
    await expect(page).toHaveURL(`${BASE_URL}/`);
  });

  test('Navigate to About external link', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const newPage = await inventoryPage.navigateToAbout();
    await expect(newPage).toHaveURL(ABOUT_URL);
  });
});
