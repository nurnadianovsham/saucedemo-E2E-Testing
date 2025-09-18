import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly swagLabsTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.usernameField = page.getByTestId('username');
    this.passwordField = page.getByTestId('password');
    this.swagLabsTitle = page.getByText('Swag Labs');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async assertTitleVisible() {
    await expect(this.swagLabsTitle).toBeVisible();
  }
}
