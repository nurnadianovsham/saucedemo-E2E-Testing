import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL, INVENTORY_URL } from '../test-data/users';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

async goto(baseUrl: string = '/') {
  await this.page.goto(baseUrl);
}

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  //goto + login in one call
  async loginAs(username: string, password: string, baseUrl: string = BASE_URL) {
    await this.goto(baseUrl);
    await this.login(username, password);
  }

  async expectError(expectedMessage?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toHaveText(expectedMessage);
    }
    await this.page.screenshot({ path: `screenshots/error_${Date.now()}.png` });
  }

  async expectRedirectInventory() {
    await expect(this.page).toHaveURL(INVENTORY_URL);
  }
}
