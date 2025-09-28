import { Locator, Page } from "@playwright/test";
import { CreateAccountPage } from "../create-account.pom";
import { CheckoutPage } from "./checkout.pom";

export class CheckoutWithoutAccountPage extends CheckoutPage {

    private readonly registrationButton: Locator;

    constructor(page: Page) {
        super(page)
        this.registrationButton = this.page.getByText('REGISTRATION')
    }

    async proceedToRegistration(): Promise<CreateAccountPage> {
        await this.registrationButton.click()
        return new CreateAccountPage(this.page)
    }
}