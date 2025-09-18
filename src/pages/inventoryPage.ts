import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;
  readonly sortDropdown: Locator;

  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly aboutLink: Locator;
  readonly resetLink: Locator;
  readonly cartBadge: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator(".inventory_item");
    this.productNames = this.productCards.locator(".inventory_item_name");
    this.productPrices = this.productCards.locator(".inventory_item_price");
    this.productImages = this.productCards.locator("img.inventory_item_img");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    // Side menu locators
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
    this.resetLink = page.locator("#reset_sidebar_link");
    this.cartBadge = page.locator(".shopping_cart_badge");

    // Cart/product buttons
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  }

  async waitForLoad() {
    await this.page.waitForSelector(".inventory_list");
  }

  async verifyAllProductsListed(expectedCount: number) {
    await expect(this.productCards).toHaveCount(expectedCount);
  }

  async assertProductDetailsVisible() {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      await expect(this.productNames.nth(i)).toBeVisible();
      await expect(this.productPrices.nth(i)).toBeVisible();
      await expect(this.productImages.nth(i)).toBeVisible();
    }
  }

  async sortBy(option: string) {
    await expect(this.sortDropdown).toBeVisible();
    await this.sortDropdown.selectOption({ label: option });
    await expect(this.sortDropdown).toHaveValue(
      await this.getSortValueByLabel(option)
    );
  }

  private async getSortValueByLabel(label: string): Promise<string> {
    const options = await this.sortDropdown.locator("option").all();
    for (let i = 0; i < options.length; i++) {
      const text = await options[i].innerText();
      if (text === label) {
        return (await options[i].getAttribute("value")) || "";
      }
    }
    return "";
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productNames.allTextContents();
    for (const name of names) {
      await expect(name.trim().length).toBeGreaterThan(0);
    }
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    const prices = priceTexts.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    for (const price of prices) {
      await expect(price).toBeGreaterThan(0);
    }
    return prices;
  }

  async clickProductByName(name: string) {
    const product = this.productNames.filter({ hasText: name }).first();
    await product.scrollIntoViewIfNeeded();
    await expect(product).toBeVisible();
    await product.click();
  }

  async expectProductDetailPage(productName: string) {
    await expect(this.page).toHaveURL(new RegExp(`/inventory-item.html.*`));
    const detailName = this.page.locator(".inventory_details_name");
    await expect(detailName).toBeVisible();
    await expect(detailName).toHaveText(productName);
  }

  // Side menu & navigation methods
  async openMenu() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async navigateToAbout() {
    await this.openMenu();
    await Promise.all([this.page.waitForNavigation(), this.aboutLink.click()]);
    return this.page;
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetLink.click();
  }

  async getCartItemCount() {
    if (await this.cartBadge.count()) {
      const countText = await this.cartBadge.textContent();
      return parseInt(countText || "0");
    }
    return 0;
  }
}
