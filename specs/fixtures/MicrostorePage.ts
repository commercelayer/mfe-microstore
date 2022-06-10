import { Page, expect, Locator } from "@playwright/test"

interface GoToProps {
  accessToken?: string
  cart?: boolean
}

interface AttributesProps {
  coupon?: string
  organization?: object
}

export class MicrostorePage {
  readonly page: Page
  readonly attributes?: AttributesProps
  readonly buyNowButton: Locator
  readonly addToCartButton: Locator
  readonly cartItemsCount: Locator

  constructor(page: Page, attributes?: AttributesProps) {
    this.page = page

    this.attributes = attributes || {}
    this.buyNowButton = this.page
      .locator("[data-test-id=button-buy-now]")
      .first()
    this.addToCartButton = this.page
      .locator("[data-test-id=button-add-to-cart]")
      .first()
    this.cartItemsCount = this.page.locator("[data-test-id=cart-items-count]")
  }

  async goto(props: GoToProps) {
    const params = JSON.parse(JSON.stringify(props))

    const querystring = new URLSearchParams(params)

    const url = `microstore/?${querystring}`

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

  async expectAddToCartButton() {
    await expect(this.addToCartButton).toBeVisible()
  }

  async addItemToCart() {
    await this.addToCartButton.click()
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
