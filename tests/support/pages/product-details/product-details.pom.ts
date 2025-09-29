import { expect, type Locator, type Page } from "@playwright/test";
import type { Product } from "../../../fixtures/types/product.type";
import { CheckoutWithoutAccountPage } from "../checkout/checkout-without-account.pom";
import { GlobalPage } from "../global.pom";

export abstract class ProductDetailsPage extends GlobalPage {
  protected readonly descriptionTitle: Locator;
  protected readonly descriptionPrice: Locator;
  protected readonly descriptionColor: Locator;
  protected readonly addToCartButton: Locator;
  protected readonly checkoutPopUp: Locator;
  protected readonly productEspecifications: Locator;

  constructor(page: Page) {
    super(page);
    this.descriptionTitle = this.page.locator(
      "div#product_2 div#Description h1",
    );
    this.descriptionPrice = this.page.locator(
      "div#product_2 div#Description > h2",
    );
    this.descriptionColor = this.page.locator(
      "div#product_2 div#Description div.colors > div:not(.ng-hide)",
    );
    this.addToCartButton = this.page.getByText("ADD TO CART");
    this.checkoutPopUp = this.page.locator("button#checkOutPopUp");
    this.productEspecifications = this.page.locator(
      "article div.list label.value",
    );
  }

  async verifyProductPageTitle(title: string): Promise<void> {
    const pageTitle = await this.descriptionTitle.textContent();
    expect(
      pageTitle?.trim().toLowerCase(),
      "Validando se o nome do produto está correto na página de detalhe.",
    ).toBe(title.toLowerCase());
  }

  async verifyProductPrice(price: string): Promise<void> {
    expect(
      await this.descriptionPrice.textContent(),
      "Validando se o preço do produto está correto na página de detalhe.",
    ).toContain(price);
  }

  async verifyProdcutPrincipalInformation(product: Product): Promise<void> {
    await this.verifyProductPageTitle(product.name);
    await this.verifyProductPrice(product.price.toString());
  }

  async pickColor(color: string): Promise<void> {
    await this.descriptionColor.getByTitle(color.toUpperCase()).click();
  }

  async addProductToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goToCheckout(): Promise<CheckoutWithoutAccountPage> {
    await this.checkoutPopUp.click();
    return new CheckoutWithoutAccountPage(this.page);
  }

  abstract verifyProductSpecifications(product: Product): Promise<void>;
}
