import { Page, expect } from "@playwright/test"

interface GoToProps {
  accessToken?: string
}

interface AttributesProps {
  coupon?: string
  organization?: object
}

export class MicrostorePage {
  readonly page: Page
  readonly attributes?: AttributesProps

  constructor(page: Page, attributes?: AttributesProps) {
    this.page = page

    this.attributes = attributes || {}
  }

  async goto(props: GoToProps) {
    const params = JSON.parse(JSON.stringify(props))

    const querystring = new URLSearchParams(params)

    const url = `/?${querystring}`

    await this.page.goto(`${url}`, {
      waitUntil: "networkidle",
    })
  }

  async expectAppTitle() {
    await expect(this.page.locator("text=Microstore")).toBeVisible()
  }

  async expectErrorPage() {
    await expect(
      this.page.locator("text=This page could not be found")
    ).toBeVisible()
  }
}
