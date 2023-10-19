import { Page, expect, Locator } from "@playwright/test"

interface GoToProps {
  accessToken?: string
  cart?: boolean
  skuListId?: string
}

interface AttributesProps {
  coupon?: string
  organization?: object
}

export class MicrostorePage {
  readonly page: Page
  readonly attributes?: AttributesProps
  readonly buyNowButton: Locator
  readonly buyAllButton: Locator
  readonly addToCartButton: Locator
  readonly addToCartInlineButton: Locator
  readonly cartItemsCount: Locator
  readonly quantitySelector: Locator

  constructor(page: Page, attributes?: AttributesProps) {
    this.page = page

    this.attributes = attributes || {}
    this.buyNowButton = this.page
      .locator("[data-test-id=button-buy-now]")
      .first()
    this.buyAllButton = this.page.locator("[data-test-id=button-buy-all]")
    this.addToCartButton = this.page
      .locator("[data-test-id=button-add-to-cart]")
      .first()
    this.addToCartInlineButton = this.page
      .locator("[data-test-id=button-add-to-cart-inline]")
      .first()
    this.cartItemsCount = this.page
      .locator("[data-test-id=cart-items-count]")
      .first()
    this.quantitySelector = this.page
      .locator("[data-test-id=quantity-selector]")
      .first()
  }

  async goto(props: GoToProps) {
    const { skuListId, ...params } = JSON.parse(JSON.stringify(props))

    const querystring = new URLSearchParams(params)

    const url = `microstore/list/${skuListId}?${querystring}`

    await this.page.goto(`${url}`, {
      waitUntil: "networkidle",
    })
  }

  async expectAppTitle() {
    await this.page.waitForFunction(() => document.title.includes("Microstore"))
  }

  async expectBuyNowButton() {
    await expect(this.buyNowButton).toBeVisible()
  }

  async expectBuyAllButton() {
    await expect(this.buyAllButton).toBeVisible()
  }

  async expectAddToCartButton({ inline }: { inline: boolean }) {
    if (inline) {
      await expect(this.addToCartInlineButton).toBeVisible()
    } else {
      await expect(this.addToCartButton).toBeVisible()
    }
  }

  async expectDefaultQuantity(quantity: number) {
    const inputValue = await this.quantitySelector.inputValue()
    await expect(inputValue).toBe(`${quantity}`)
  }

  async addItemToCart({ inline }: { inline: boolean }) {
    if (inline) {
      await this.addToCartInlineButton.click()
    } else {
      await this.addToCartButton.click()
    }
  }

  async checkCartItemsCount(total: number) {
    await expect(this.cartItemsCount).toHaveText(`${total}`)
  }

  async expectCartLinkOnTop() {
    await expect(
      this.page.locator(`[data-test-id=link-view-cart]`)
    ).toBeVisible()
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This page could not be found")
    ).toBeVisible()
  }
}
