import { test, expect } from "../fixtures/tokenizedPage"

test.describe("With add and go to cart feature enabled", () => {
  test.use({
    defaultParams: {
      skus: "TSHIRTMS000000FFFFFFLXXX",
      cart: true,
      inline: false,
    },
  })

  test("should see the add (and go) to cart button", async ({
    microstorePage,
  }) => {
    await microstorePage.expectAddToCartButton({ inline: false })
  })
})

test.describe("With inline cart feature enabled", () => {
  test.use({
    defaultParams: {
      skus: "TSHIRTMS000000FFFFFFLXXX",
      cart: true,
      inline: true,
    },
  })

  test("should see the add to cart (inline) button", async ({
    microstorePage,
  }) => {
    await microstorePage.expectAddToCartButton({ inline: true })
  })

  test("should see an empty cart link on top", async ({ microstorePage }) => {
    await microstorePage.expectCartLinkOnTop()
  })

  test("view cart link shold be enabled once one product has been added to cart", async ({
    microstorePage,
  }) => {
    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(1)
    await microstorePage.expectCartLinkOnTop()
  })

  test("view cart link should have a proper cart URL", async ({
    microstorePage,
  }) => {
    await microstorePage.addItemToCart({ inline: true })
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
