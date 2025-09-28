import { test } from '@playwright/test';
import { HomePage } from './support/pages/home.pom';
import { SpeakersProductsPage } from './support/pages/products-lists/speakers-products-list.pom';
import { SpeakerProductDetailsPage } from './support/pages/product-details/speaker-product-details.pom';
import { CheckoutWithoutAccountPage } from './support/pages/checkout/checkout-without-account.pom';
import { CheckoutLoggedInPage } from './support/pages/checkout/checkout-logged-in.pom';
import { CreateAccountPage } from './support/pages/create-account.pom';
import { spearksProducts } from './fixtures/data/speaker-products';
import { SpeakerProduct } from './fixtures/types/speaker-product.type';
import { UserBuilder } from './fixtures/data/user.builder';
import { User } from './fixtures/types/user.type';


test.describe('Checkout Logged In', () => {

  let homePage: HomePage
  let speakersProductsPage: SpeakersProductsPage
  let speakerProductDetailsPage: SpeakerProductDetailsPage
  let checkoutWithoutAccountPage: CheckoutWithoutAccountPage
  let createAccountPage: CreateAccountPage
  let checkoutLoggedInPage: CheckoutLoggedInPage
  let user: User
  const speakerProduct = spearksProducts.get(23) as SpeakerProduct

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigateToHomePage()
    await homePage.verifyTabPageTitle()
    speakersProductsPage = await homePage.navigateToSpeakersCategory()
    await speakersProductsPage.verifySpeakersPageTitle()
    speakerProductDetailsPage = await speakersProductsPage.goToProductDetails(speakerProduct)
    await speakerProductDetailsPage.pickColor(speakerProduct.color)
    await speakerProductDetailsPage.verifyProdcutPrincipalInformation(speakerProduct)
    await speakerProductDetailsPage.verifyProductSpecifications(speakerProduct)
    await speakerProductDetailsPage.addProductToCart()
    checkoutWithoutAccountPage = await speakerProductDetailsPage.goToCheckout()
    createAccountPage = await checkoutWithoutAccountPage.proceedToRegistration()
    user = new UserBuilder().withCountry('United States').build()
  })


  test(`Order ${speakerProduct.name.toLowerCase()}`, {tag: '@buyorder'}, async () => {
    await test.step('Preenchendo os dados para criação de usuário.', async () => {
      checkoutLoggedInPage = await createAccountPage.fillFormAndSubmitAndGoToCheckoutLoggedIn(user)
    })
    
    await test.step('Usuário cadastrado com sucesso, retornando para o checkout.', async () => {
      await checkoutLoggedInPage.verifyUserLoggedIn(user.username)
    })

    await checkoutLoggedInPage.verifyProductInformation(speakerProduct)
    await checkoutLoggedInPage.verifyShippingDetails(user)
    await checkoutLoggedInPage.fillPaymentDetailsAndSubmitOrder(user)
  })

});
