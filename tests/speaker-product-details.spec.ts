import { test } from "@playwright/test";
import { spearksProducts } from "./fixtures/data/speaker-products";
import type { SpeakerProduct } from "./fixtures/types/speaker-product.type";
import { HomePage } from "./support/pages/home.pom";
import type { SpeakerProductDetailsPage } from "./support/pages/product-details/speaker-product-details.pom";
import type { SpeakersProductsPage } from "./support/pages/products-lists/speakers-products-list.pom";

test.describe("Speark product details page", () => {
  let homePage: HomePage;
  let speakersProductsPage: SpeakersProductsPage;
  const speakerProduct = spearksProducts.get(22) as SpeakerProduct;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    speakersProductsPage = await homePage.navigateToSpeakersCategory();
  });

  test(`Navigate to ${speakerProduct.name.toLowerCase()} details`, async ({
    page,
  }) => {
    const speakerProductDetailsPage: SpeakerProductDetailsPage =
      await speakersProductsPage.goToProductDetails(speakerProduct);
    await speakerProductDetailsPage.verifyProdcutPrincipalInformation(
      speakerProduct,
    );
    await speakerProductDetailsPage.pickColor(speakerProduct.color);
    await speakerProductDetailsPage.verifyProductSpecifications(speakerProduct);
    await speakerProductDetailsPage.addProductToCart();
    await speakerProductDetailsPage.verifyCartCounter(1);
  });
});
