import { expect, type Locator, type Page } from "@playwright/test";
import type { User } from "../../fixtures/types/user.type";
import { CheckoutLoggedInPage } from "./checkout/checkout-logged-in.pom";
import { GlobalPage } from "./global.pom";

export class CreateAccountPage extends GlobalPage {
  private readonly createAccountTitle: Locator;
  private readonly usernameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly countrySelect: Locator;
  private readonly cityInput: Locator;
  private readonly addressInput: Locator;
  private readonly stateInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly agreeToTermsCheckbox: Locator;
  private readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);

    this.createAccountTitle = this.page.getByRole("heading", {
      name: "CREATE ACCOUNT",
    });
    this.usernameInput = this.page.locator(
      'input[name="usernameRegisterPage"]',
    );
    this.emailInput = this.page.locator('input[name="emailRegisterPage"]');
    this.passwordInput = this.page.locator(
      'input[name="passwordRegisterPage"]',
    );
    this.confirmPasswordInput = this.page.locator(
      'input[name="confirm_passwordRegisterPage"]',
    );
    this.firstNameInput = this.page.locator(
      'input[name="first_nameRegisterPage"]',
    );
    this.lastNameInput = this.page.locator(
      'input[name="last_nameRegisterPage"]',
    );
    this.phoneNumberInput = this.page.locator(
      'input[name="phone_numberRegisterPage"]',
    );
    this.countrySelect = this.page.locator(
      'select[name="countryListboxRegisterPage"]',
    );
    this.cityInput = this.page.locator('input[name="cityRegisterPage"]');
    this.addressInput = this.page.locator('input[name="addressRegisterPage"]');
    this.stateInput = this.page.locator(
      'input[name="state_/_province_/_regionRegisterPage"]',
    );
    this.postalCodeInput = this.page.locator(
      'input[name="postal_codeRegisterPage"]',
    );
    this.agreeToTermsCheckbox = this.page.locator('input[name="i_agree"]');
    this.registerButton = this.page.getByText("REGISTER");
  }

  async verifyRequiredInputs() {
    await this.usernameInput.focus();
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.press("Tab");
    await expect(
      this.page.getByText("Username field is required", { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByText("Email field is required", { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByText("Password field is required", { exact: true }),
    ).toBeVisible();
    await expect(
      this.page.getByText("Confirm password field is required", {
        exact: true,
      }),
    ).toBeVisible();
  }

  async fillFormAndSubmitAndGoToCheckoutLoggedIn(
    user: User,
  ): Promise<CheckoutLoggedInPage> {
    await this.usernameInput.fill(user.username);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.phoneNumberInput.fill(user.phoneNumber);
    await this.countrySelect.selectOption(user.country);
    await this.cityInput.fill(user.city);
    await this.addressInput.fill(user.address);
    await this.stateInput.fill(user.state);
    await this.postalCodeInput.fill(user.postalCode);
    await this.agreeToTermsCheckbox.check();
    await this.registerButton.click();
    return new CheckoutLoggedInPage(this.page);
  }
}
