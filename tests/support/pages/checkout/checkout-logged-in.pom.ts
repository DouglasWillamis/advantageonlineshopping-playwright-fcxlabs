import { Expect, expect, type Locator, type Page } from "@playwright/test";
import type { User } from "../../../fixtures/types/user.type";
import { CheckoutPage } from "./checkout.pom";

export class CheckoutLoggedInPage extends CheckoutPage {
  private readonly shippingDetailsSection: Locator;
  private readonly proceedToPaymentButton: Locator;
  private readonly creditCardPaymentMethodRadio: Locator;
  private readonly creditCardNumberInput: Locator;
  private readonly creditCardHolderNameInput: Locator;
  private readonly creditCardSecurityCodeInput: Locator;
  private readonly payOrderButton: Locator;
  private readonly sucessOrderMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.shippingDetailsSection = this.page.locator(
      "div#userSection div#userDetails label",
    );
    this.proceedToPaymentButton = this.page.getByRole("button", {
      name: "NEXT",
    });
    this.creditCardPaymentMethodRadio = this.page.locator(
      'input[name="masterCredit"]',
    );
    this.creditCardNumberInput = this.page.locator('input[name="card_number"]');
    this.creditCardHolderNameInput = this.page.locator(
      'input[name="cardholder_name"]',
    );
    this.creditCardSecurityCodeInput = this.page.locator(
      'input[name="cvv_number"]',
    );
    this.payOrderButton = this.page.locator("button#pay_now_btn_ManualPayment");
    this.sucessOrderMessage = this.page.getByText(
      "Thank you for buying with Advantage",
    );
  }

  async verifyShippingDetails(user: User): Promise<void> {
    await expect(
      this.shippingDetailsSection.getByText(
        `${user.firstName} ${user.lastName}`,
      ),
      "Validando a exibição do nome do usuário nos detalhes de entrega.",
    ).toBeVisible();
    await expect(
      this.shippingDetailsSection.getByText(user.address),
      "Validando a exibição do endereço do usuário nos detalhes de entrega.",
    ).toBeVisible();
    await expect(
      this.shippingDetailsSection.getByText(user.city),
      "Validando a exibição da cidade do usuário nos detalhes de entrega.",
    ).toBeVisible();
    await expect(
      this.shippingDetailsSection.getByText(user.state),
      "Validando a exibição do estado do usuário nos detalhes de entrega.",
    ).toBeVisible();
    await expect(
      this.shippingDetailsSection.getByText(user.postalCode),
      "Validando a exibição do CEP do usuário nos detalhes de entrega.",
    ).toBeVisible();
    await expect(
      this.shippingDetailsSection.getByText(user.country),
      "Validando a exibição do país do usuário nos detalhes de entrega.",
    ).toBeVisible();
    await expect(
      this.shippingDetailsSection.getByText(user.phoneNumber),
      "Validando a exibição do telefone do usuário nos detalhes de entrega.",
    ).toBeVisible();
  }

  async fillPaymentDetailsAndSubmitOrder(user: User): Promise<void> {
    await this.proceedToPaymentButton.click();
    await this.creditCardPaymentMethodRadio.check();
    await this.creditCardNumberInput.fill(user.creditCardNumber);
    await this.creditCardSecurityCodeInput.fill(user.creditCardSecurityCode);
    await this.creditCardHolderNameInput.fill(user.creditCardHolderName);
    await this.payOrderButton.click();
    await expect(
      this.sucessOrderMessage,
      "Validando se a compra foi realizada com sucesso.",
    ).toBeVisible();
  }
}
