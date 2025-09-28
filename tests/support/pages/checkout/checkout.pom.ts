import { expect, Locator, Page } from "@playwright/test";
import { GlobalPage } from "../global.pom";
import { Product } from "../../../fixtures/types/product.type";

export abstract class CheckoutPage extends GlobalPage {

    private readonly cartItems: Locator
    private readonly cartTotalPrice: Locator;

    constructor(page: Page) {
        super(page)
        this.cartItems = this.page.locator('div#userCart tr#product td a')
        this.cartTotalPrice = this.page.locator('label.totalText')
    }

    private formatProductName(name: string): string {
        return name.length > 27 ? name.substring(0, 27) + '...' : name
    }

    async verifyProductInformation(product: Product): Promise<void> {
        const productNameInCart = this.cartItems.getByRole('heading', { name: this.formatProductName(product.name) })
        const productQtyInCart = productNameInCart.locator('+label')
        const productColorInCart = productQtyInCart.locator('+label')

        await expect(productNameInCart).toBeVisible()
        await expect(productQtyInCart).toContainText("QTY: 1")
        await expect(productColorInCart).toContainText(`Color: ${product.color.toUpperCase()}`)
        await expect(this.cartTotalPrice).toContainText(product.price.toString())
    }
}