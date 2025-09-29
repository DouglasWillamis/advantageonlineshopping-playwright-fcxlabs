import { test } from "@playwright/test";
import { HomePage } from "./support/pages/home.pom";

test.describe("Home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test("Navigate to home page", async () => {
    await homePage.navigateToHomePage();
    await homePage.verifyproductsCategoryVisibility();
    await homePage.verifyTabPageTitle();
  });

  test("Navigate to product category from home page", async () => {
    await homePage.navigateToHomePage();
    const speakersPage = await homePage.navigateToSpeakersCategory();
    await speakersPage.verifySpeakersPageTitle();
  });
});
