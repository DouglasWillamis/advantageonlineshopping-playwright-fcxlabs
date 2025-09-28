import { expect, Page } from "@playwright/test";
import { ProductDetailsPage } from "./product-details.pom";
import { SpeakerProduct } from "../../../fixtures/types/speaker-product.type";

export class SpeakerProductDetailsPage extends ProductDetailsPage {
    constructor(page: Page) {
        super(page)
    }

    async verifyProductSpecifications(product: SpeakerProduct): Promise<void> {
        await expect(this.productEspecifications.getByText(product.compatibility)).toBeVisible()
        await expect(this.productEspecifications.getByText(product.connector)).toBeVisible()
        await expect(this.productEspecifications.getByText(product.manufacturer)).toBeVisible()
        await expect(this.productEspecifications.getByText(product.weight)).toBeVisible()
        await expect(this.productEspecifications.getByText(product.wirelessTechnology)).toBeVisible()
    }
}