import { test } from "../fixtures/tokenizedPage"

test.describe("Param `all=true` is found in url params without cart", () => {
  test.use({
    defaultParams: {
      skuListId: process.env.E2E_SKU_LIST_ID,
      all: true,
    },
  })

  test("should see the buy all button", async ({ microstorePage }) => {
    await microstorePage.expectBuyAllButton()
  })
})

test.describe(
  "Param `all=true` is found in url params when cart is enabled",
  () => {
    test.use({
      defaultParams: {
        skuListId: process.env.E2E_SKU_LIST_ID,
        all: true,
        cart: true,
      },
    })

    test("should see the buy all button", async ({ microstorePage }) => {
      await microstorePage.expectBuyAllButton()
    })
  }
)
