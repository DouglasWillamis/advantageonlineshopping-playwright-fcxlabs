import { test } from "@playwright/test";
import { spearksProducts } from "./fixtures/data/speaker-products";
import type { SpeakerProduct } from "./fixtures/types/speaker-product.type";
import { HomePage } from "./support/pages/home.pom";
import type { SpeakerProductDetailsPage } from "./support/pages/product-details/speaker-product-details.pom";
import type { SpeakersProductsPage } from "./support/pages/products-lists/speakers-products-list.pom";

test.describe("Checkout without login", () => {
  let homePage: HomePage;
  let speakersProductsPage: SpeakersProductsPage;
  let speakerProductDetailsPage: SpeakerProductDetailsPage;
  const speakerProduct = spearksProducts.get(25) as SpeakerProduct;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    speakersProductsPage = await homePage.navigateToSpeakersCategory();
    speakerProductDetailsPage =
      await speakersProductsPage.goToProductDetails(speakerProduct);
    await speakerProductDetailsPage.pickColor(speakerProduct.color);
    await speakerProductDetailsPage.addProductToCart();
  });

  test(`Navigate to checkout without login to buy ${speakerProduct.name.toLowerCase()}`, async ({
    page,
  }) => {
    const checkoutWithoutAccountPage =
      await speakerProductDetailsPage.goToCheckout();
    await checkoutWithoutAccountPage.verifyProductInformation(speakerProduct);
  });
});
