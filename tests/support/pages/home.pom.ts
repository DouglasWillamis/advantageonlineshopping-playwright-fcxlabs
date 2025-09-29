import { expect, type Locator, type Page } from "@playwright/test";
import { HomeProductCategory } from "../../fixtures/enums/home-product-category.enum";
import { GlobalPage } from "./global.pom";
import { SpeakersProductsPage } from "./products-lists/speakers-products-list.pom";

export class HomePage extends GlobalPage {
  private readonly homePageUrl = "/";
  private readonly productsCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.productsCategory = this.page.locator(
      "article#our_products div.rowSection div.categoryCell",
    );
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.homePageUrl);
  }

  async verifyproductsCategoryVisibility(): Promise<void> {
    const numberOfCategories = Object.keys(HomeProductCategory).length;
    await expect(
      this.productsCategory,
      `Validando se a quantidade de categorias de produtos na página inicial é igual a ${numberOfCategories}.`,
    ).toHaveCount(numberOfCategories);
  }

  private async navigateToProductCategory(
    category: HomeProductCategory,
  ): Promise<void> {
    await this.page.getByRole("link", { name: category }).click();
  }

  async navigateToSpeakersCategory(): Promise<SpeakersProductsPage> {
    await this.navigateToProductCategory(HomeProductCategory.Speakers);
    return new SpeakersProductsPage(this.page);
  }

  // TODO: Implementar navegação para as outras categorias de produtos
  async navigateToTabletsCategory(): Promise<void> {
    await this.navigateToProductCategory(HomeProductCategory.Tablets);
  }

  // TODO: Implementar navegação para as outras categorias de produtos
  async navigateToHeadphonesCategory(): Promise<void> {
    await this.navigateToProductCategory(HomeProductCategory.Headphones);
  }

  // TODO: Implementar navegação para as outras categorias de produtos
  async navigateToLaptopsCategory(): Promise<void> {
    await this.navigateToProductCategory(HomeProductCategory.Laptops);
  }

  // TODO: Implementar navegação para as outras categorias de produtos
  async navigateToMiceCategory(): Promise<void> {
    await this.navigateToProductCategory(HomeProductCategory.Mice);
  }
}
