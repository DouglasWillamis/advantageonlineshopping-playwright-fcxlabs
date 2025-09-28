import { test } from '@playwright/test';
import { HomePage } from './support/pages/home.pom';
import { SpeakersProductsPage } from './support/pages/products-lists/speakers-products-list.pom';
import { spearksProducts } from './fixtures/data/speaker-products';
import { SpeakerProduct } from './fixtures/types/speaker-product.type';
import { SpeakerProductDetailsPage } from './support/pages/product-details/speaker-product-details.pom';


test.describe('Checkout without login', () => {

  let homePage: HomePage
  let speakersProductsPage: SpeakersProductsPage
  let speakerProductDetailsPage: SpeakerProductDetailsPage
  const speakerProduct = spearksProducts.get(25) as SpeakerProduct

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigateToHomePage()
    speakersProductsPage = await homePage.navigateToSpeakersCategory();
    speakerProductDetailsPage = await speakersProductsPage.goToProductDetails(speakerProduct)
    await speakerProductDetailsPage.pickColor(speakerProduct.color)
    await speakerProductDetailsPage.addProductToCart()
  })


  test(`Navigate to checkout without login to buy ${speakerProduct.name.toLowerCase()}`, async ({page}) => {
    const checkoutWithoutAccountPage = await speakerProductDetailsPage.goToCheckout()
    await checkoutWithoutAccountPage.verifyProductInformation(speakerProduct)
  });
});
