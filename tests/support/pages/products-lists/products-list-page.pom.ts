import { expect, Locator, Page } from "@playwright/test";
import { GlobalPage } from "../global.pom";
import type { ProductDetailsPage } from "../product-details/product-details.pom";
import type { Product } from "../../../fixtures/types/product.type"

export abstract class ProductsListPage extends GlobalPage {

    protected readonly productsCount: Locator
    protected readonly productsList: Locator

    constructor(page: Page) {
        super(page)
        this.productsCount = this.page.locator('div.category-type-products a.titleItemsCount')
        this.productsList = this.page.locator('div.cell.categoryRight li')
    }

    async verifyTotalProducts(count: number): Promise<void> {
        expect(await this.productsCount.textContent(), 'Validando o total de itens na lista de produtos.').toContain(`${count} ITEMS`)
    }

    abstract goToProductDetails(product: Product): Promise<ProductDetailsPage>;
}