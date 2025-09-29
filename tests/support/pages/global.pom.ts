import { expect, type Locator, type Page } from "@playwright/test";

export abstract class GlobalPage {
  private readonly tabPageTitle = "Advantage Shopping";
  private readonly logo: Locator;
  private readonly userMenu: Locator;
  private readonly searchButton: Locator;
  private readonly SearchInputWrapper: Locator;
  private readonly searchInput: Locator;
  private readonly searchInputCloseButton: Locator;
  private readonly cartCounter: Locator;
  private readonly usernameDisplay: Locator;

  constructor(protected readonly page: Page) {
    this.page = page;
    this.logo = this.page.locator("div.logo");
    this.userMenu = this.page.getByTitle("USER");
    this.searchButton = this.page.getByTitle("SEARCH");
    this.SearchInputWrapper = this.page.locator("div.autoCompleteCover");
    this.searchInput = this.page.locator("input#autoComplete");
    this.searchInputCloseButton = this.page.locator(
      "div.autoCompleteCover div",
    );
    this.cartCounter = this.page.locator("a#shoppingCartLink span.cart");
    this.usernameDisplay = this.page.locator("a#menuUserLink span.hi-user");
  }

  async verifyTabPageTitle(): Promise<void> {
    await expect(
      this.page,
      "Validando o título na aba do navegador.",
    ).toHaveTitle(new RegExp(this.tabPageTitle, "i"));
  }

  async logoClick(): Promise<void> {
    await this.logo.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async openSearchInput(): Promise<void> {
    await this.searchButton.click();
    await expect(this.searchInput).toBeVisible();
  }

  async closeSearchInput(): Promise<void> {
    await this.searchInputCloseButton.click();
    await this.page.waitForFunction(
      (element) => element?.clientWidth === 0,
      await this.SearchInputWrapper.elementHandle(),
    );
    await expect(this.SearchInputWrapper).toHaveCSS("width", "0px");
  }

  async searchForProduct(name: string): Promise<void> {
    await this.openSearchInput();
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async verifyCartCounter(count: number): Promise<void> {
    await expect(
      this.cartCounter,
      `Validando se a quantidade de produtos no carrinho é igual a ${count}.`,
    ).toContainText(count.toString());
  }

  verifyUserLoggedIn(username: string): Promise<void> {
    return expect(
      this.usernameDisplay,
      `Validando se o username exibido é igual a ${username}.`,
    ).toHaveText(username);
  }
}
