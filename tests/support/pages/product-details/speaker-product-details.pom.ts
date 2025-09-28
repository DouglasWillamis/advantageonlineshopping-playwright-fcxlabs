import { expect, Page } from "@playwright/test";
import { ProductDetailsPage } from "./product-details.pom";
import { SpeakerProduct } from "../../../fixtures/types/speaker-product.type";

export class SpeakerProductDetailsPage extends ProductDetailsPage {
    constructor(page: Page) {
        super(page)
    }

    async verifyProductSpecifications(product: SpeakerProduct): Promise<void> {
        await expect(this.productEspecifications.getByText(product.compatibility), 'Validando a especificação de compatibilidade.').toBeVisible()
        await expect(this.productEspecifications.getByText(product.connector), 'Validando as especificações do conector.').toBeVisible()
        await expect(this.productEspecifications.getByText(product.manufacturer), 'Validando o fabricante.').toBeVisible()
        await expect(this.productEspecifications.getByText(product.weight), 'Validando o peso.').toBeVisible()
        await expect(this.productEspecifications.getByText(product.wirelessTechnology), 'Validando a especificação da tecnologia sem fio.').toBeVisible()
    }
}