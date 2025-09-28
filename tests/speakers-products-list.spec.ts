import { test } from '@playwright/test';
import { HomePage } from './support/pages/home.pom';
import { SpeakersProductsPage } from './support/pages/products-lists/speakers-products-list.pom';
import { spearksProducts } from './fixtures/data/speaker-products';
import { SpeakerProduct } from './fixtures/types/speaker-product.type';


test.describe('Spearks products page', () => {

  let homePage: HomePage
  let speakersProductsPage: SpeakersProductsPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
  })


  test('Navigate to spearks produtcs page', async () => {
    await homePage.navigateToHomePage()
    speakersProductsPage = await homePage.navigateToSpeakersCategory();
    await speakersProductsPage.verifySpeakersPageTitle()
    await speakersProductsPage.verifyTotalProducts(spearksProducts.size)
    await speakersProductsPage.goToProductDetails(spearksProducts.get(20) as SpeakerProduct)
  });
});
