import { test } from "../fixtures/tokenizedPage"

test.describe("With quantity selector, for specific sku", () => {
  test.use({
    defaultParams: {
      skuListId: process.env.E2E_SKU_LIST_ID,
      cart: true,
      inline: true,
    },
  })

  test("should add default quantity to cart", async ({ microstorePage }) => {
    await microstorePage.expectDefaultQuantity(12)
    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(12)
  })

  test("should be able to manually update quantity", async ({
    microstorePage,
  }) => {
    await microstorePage.quantitySelector.selectOption("4")
    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(4)
  })
})
