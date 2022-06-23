import { test } from "../fixtures/tokenizedPage"

test.describe("Param `all=true` is found in url params without cart", () => {
  test.use({
    defaultParams: {
      skus: "TSHIRTMS000000FFFFFFLXXX,BEANIEXXFFFFFF000000XXXX:3",
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
        skus: "TSHIRTMS000000FFFFFFLXXX,BEANIEXXFFFFFF000000XXXX:3",
        all: true,
        cart: true,
      },
    })

    test("should see the buy all button", async ({ microstorePage }) => {
      await microstorePage.expectBuyAllButton()
    })
  }
)
