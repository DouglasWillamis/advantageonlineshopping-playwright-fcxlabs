import { expect, type Locator, type Page } from "@playwright/test";
import type { Product } from "../../../fixtures/types/product.type";
import { GlobalPage } from "../global.pom";

export abstract class CheckoutPage extends GlobalPage {
  private readonly cartItems: Locator;
  private readonly cartTotalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = this.page.locator("div#userCart tr#product td a");
    this.cartTotalPrice = this.page.locator("label.totalText");
  }

  private formatProductName(name: string): string {
    return name.length > 27 ? name.substring(0, 27) + "..." : name;
  }

  async verifyProductInformation(product: Product): Promise<void> {
    const productNameInCart = this.cartItems.getByRole("heading", {
      name: this.formatProductName(product.name),
    });
    const productQtyInCart = productNameInCart.locator("+label");
    const productColorInCart = productQtyInCart.locator("+label");

    await expect(
      productNameInCart,
      "Validando a exibição correta do nome do produto.",
    ).toBeVisible();
    // TODO: implementar uma validação dinâmica.
    await expect(
      productQtyInCart,
      "Validando a exibição correta da quantidade de produtos adicionada.",
    ).toContainText("QTY: 1");
    await expect(
      productColorInCart,
      "Validando a cor escolhida do produto.",
    ).toContainText(`Color: ${product.color.toUpperCase()}`);
    await expect(
      this.cartTotalPrice,
      "Validando o preço total da compra.",
    ).toContainText(product.price.toString());
  }
}
