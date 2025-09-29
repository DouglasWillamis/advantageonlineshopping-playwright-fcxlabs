import { expect, type Locator, type Page } from "@playwright/test";
import type { SpeakerProduct } from "../../../fixtures/types/speaker-product.type";
import { SpeakerProductDetailsPage } from "../product-details/speaker-product-details.pom";
import { ProductsListPage } from "./products-list-page.pom";

export class SpeakersProductsPage extends ProductsListPage {
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.getByRole("heading", { name: "SPEAKERS" });
  }

  async verifySpeakersPageTitle(): Promise<void> {
    await expect(
      this.pageTitle,
      "Validando o título da página de lista de produtos de sons.",
    ).toBeVisible();
  }

  async verifyProductInList(product: SpeakerProduct): Promise<Locator> {
    const { name, price } = product;
    const productNameElement = this.productsList.getByText(name);
    // TODO: Melhorar seletor para buscar o preço do produto específico
    const productPriceElement = this.productsList.getByText(price.toString());

    await expect(
      productNameElement,
      "Validando a visibilidade do produto na lista pelo nome.",
    ).toBeVisible();
    await expect(
      productPriceElement,
      "Validando a visibilidade do produto na lista pelo preço.",
    ).toBeVisible();

    const nameText = (await productNameElement.textContent())?.toLowerCase();
    expect(
      nameText,
      "Comparando o valor do nome do produto no site com o da massa de teste.",
    ).toBe(name.toLowerCase());

    const priceText = await productPriceElement.textContent();
    expect(
      priceText,
      "Comparando o valor do preço do produto no site com o da massa de teste.",
    ).toContain(`${price}`);

    return productNameElement;
  }

  async goToProductDetails(
    product: SpeakerProduct,
  ): Promise<SpeakerProductDetailsPage> {
    const productElement = await this.verifyProductInList(product);
    await productElement.click();
    return new SpeakerProductDetailsPage(this.page);
  }
}
