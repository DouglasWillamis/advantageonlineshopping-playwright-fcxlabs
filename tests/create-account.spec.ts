import { test } from "@playwright/test";
import { spearksProducts } from "./fixtures/data/speaker-products";
import { UserBuilder } from "./fixtures/data/user.builder";
import type { SpeakerProduct } from "./fixtures/types/speaker-product.type";
import type { CheckoutWithoutAccountPage } from "./support/pages/checkout/checkout-without-account.pom";
import { HomePage } from "./support/pages/home.pom";
import type { SpeakerProductDetailsPage } from "./support/pages/product-details/speaker-product-details.pom";
import type { SpeakersProductsPage } from "./support/pages/products-lists/speakers-products-list.pom";

test.describe("Create Account", () => {
  let homePage: HomePage;
  let speakersProductsPage: SpeakersProductsPage;
  let speakerProductDetailsPage: SpeakerProductDetailsPage;
  let checkoutWithoutAccountPage: CheckoutWithoutAccountPage;
  const speakerProduct = spearksProducts.get(24) as SpeakerProduct;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    speakersProductsPage = await homePage.navigateToSpeakersCategory();
    speakerProductDetailsPage =
      await speakersProductsPage.goToProductDetails(speakerProduct);
    await speakerProductDetailsPage.pickColor(speakerProduct.color);
    await speakerProductDetailsPage.addProductToCart();
    checkoutWithoutAccountPage = await speakerProductDetailsPage.goToCheckout();
  });

  test("Verify inputs required", async () => {
    const createAccountPage =
      await checkoutWithoutAccountPage.proceedToRegistration();
    await createAccountPage.verifyRequiredInputs();
  });

  test("Fill form, submit and go to checkout", async ({ page }) => {
    const createAccountPage =
      await checkoutWithoutAccountPage.proceedToRegistration();
    const user = new UserBuilder().withCountry("United States").build();
    await createAccountPage.fillFormAndSubmitAndGoToCheckoutLoggedIn(user);
    await createAccountPage.verifyUserLoggedIn(user.username);
  });
});
