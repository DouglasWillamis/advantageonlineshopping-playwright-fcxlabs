import { expect, Expect, Locator, Page } from "@playwright/test";
import { CheckoutPage } from "./checkout.pom";
import { User } from "../../../fixtures/types/user.type";

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
        super(page)
        this.shippingDetailsSection = this.page.locator('div#userSection div#userDetails label')
        this.proceedToPaymentButton = this.page.getByRole('button', { name: 'NEXT' })
        this.creditCardPaymentMethodRadio = this.page.locator('input[name="masterCredit"]')
        this.creditCardNumberInput = this.page.locator('input[name="card_number"]')
        this.creditCardHolderNameInput = this.page.locator('input[name="cardholder_name"]')
        this.creditCardSecurityCodeInput = this.page.locator('input[name="cvv_number"]')
        this.payOrderButton = this.page.locator('button#pay_now_btn_ManualPayment')
        this.sucessOrderMessage = this.page.getByText('Thank you for buying with Advantage')
    }

    async verifyShippingDetails(user: User): Promise<void> {
        await expect(this.shippingDetailsSection.getByText(`${user.firstName} ${user.lastName}`)).toBeVisible()
        await expect(this.shippingDetailsSection.getByText(user.address)).toBeVisible()
        await expect(this.shippingDetailsSection.getByText(user.city)).toBeVisible()
        await expect(this.shippingDetailsSection.getByText(user.state)).toBeVisible()
        await expect(this.shippingDetailsSection.getByText(user.postalCode)).toBeVisible()
        await expect(this.shippingDetailsSection.getByText(user.country)).toBeVisible()
        await expect(this.shippingDetailsSection.getByText(user.phoneNumber)).toBeVisible()
    }

    async fillPaymentDetailsAndSubmitOrder(user: User): Promise<void> {
        await this.proceedToPaymentButton.click()
        await this.creditCardPaymentMethodRadio.check()
        await this.creditCardNumberInput.fill(user.creditCardNumber)
        await this.creditCardSecurityCodeInput.fill(user.creditCardSecurityCode)
        await this.creditCardHolderNameInput.fill(user.creditCardHolderName)
        await this.payOrderButton.click()
        await expect(this.sucessOrderMessage, 'validando se comprar foi um sucesso').toBeVisible()
    }
}