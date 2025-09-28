import { expect, Locator, Page } from "@playwright/test";
import { ProductsListPage } from "./products-list-page.pom";
import { SpeakerProductDetailsPage } from '../product-details/speaker-product-details.pom';
import { SpeakerProduct } from "../../../fixtures/types/speaker-product.type";

export class SpeakersProductsPage extends ProductsListPage {
    private readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = this.page.getByRole('heading', { name: 'SPEAKERS' });
    }

    async verifySpeakersPageTitle(): Promise<void> {
        await expect(this.pageTitle, 'Título da página SPEAKERS não está visível').toBeVisible();
    }

    async verifyProductInList (product: SpeakerProduct): Promise<Locator> {
        const { name, price } = product;
        const productNameElement = this.productsList.getByText(name);
        // TODO: Melhorar seletor para buscar o preço do produto específico
        const productPriceElement = this.productsList.getByText(price.toString());

        await expect(productNameElement).toBeVisible();
        await expect(productPriceElement).toBeVisible();

        const nameText = (await productNameElement.textContent())?.toLowerCase();
        expect(nameText).toBe(name.toLowerCase());

        const priceText = await productPriceElement.textContent();
        expect(priceText).toContain(`${price}`);

        return productNameElement;
    }

    async goToProductDetails(product: SpeakerProduct): Promise<SpeakerProductDetailsPage> {
        const productElement = await this.verifyProductInList(product);
        await productElement.click();
        return new SpeakerProductDetailsPage(this.page);
    }
}