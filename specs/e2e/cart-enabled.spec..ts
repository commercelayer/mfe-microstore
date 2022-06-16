import { test, expect } from "../fixtures/tokenizedPage"

test.describe("With cart feature enabled", () => {
  test.use({
    defaultParams: {
      skus: "APPTESLA",
      cart: true,
      inline: true,
    },
  })

  test("should see the add to cart button", async ({ microstorePage }) => {
    await microstorePage.expectAddToCartButton()
  })

  test("should see an empty cart link on top", async ({ microstorePage }) => {
    await microstorePage.expectCartLinkOnTop()
  })

  test("view cart link shold be enabled once one product has been added to cart", async ({
    microstorePage,
  }) => {
    await microstorePage.addItemToCart()
    await microstorePage.checkCartItemsCount(1)
    await microstorePage.expectCartLinkOnTop()
  })

  test("view cart link should have a proper cart URL", async ({
    microstorePage,
  }) => {
    await microstorePage.addItemToCart()
    await microstorePage.checkCartItemsCount(1)

    // validate cart url
    const carlUrl =
      (await microstorePage.page
        .locator("[data-test-id=link-view-cart]")
        .getAttribute("href")) || ""
    const parsedUrl = new URL(carlUrl)
    const queryStringParams = new URLSearchParams(parsedUrl.search)

    expect(parsedUrl.pathname).toContain("/cart/")
    expect(queryStringParams.get("accessToken")).toBeTruthy()
  })
})
