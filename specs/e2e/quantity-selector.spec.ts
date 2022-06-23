import { test, expect } from "../fixtures/tokenizedPage"

const defaultQuantity = 3

test.describe("With quantity selector, for specific sku", () => {
  test.use({
    defaultParams: {
      skus: `BEANIEXXFFFFFF000000XXXX:${defaultQuantity}`,
      cart: true,
      inline: true,
    },
  })

  test("should add default quantity to cart", async ({ microstorePage }) => {
    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(defaultQuantity)
  })

  test("should be able to manually update quantity", async ({
    microstorePage,
  }) => {
    await microstorePage.quantitySelector.selectOption("4")
    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(4)
  })
})

test.describe("No quantity selector if no quantity is passed in url", () => {
  test.use({
    defaultParams: {
      skus: `BEANIEXXFFFFFF000000XXXX:0,TSHIRTMS000000FFFFFFLXXX`,
      cart: true,
      inline: true,
    },
  })

  test("should not see quantity selector", async ({ microstorePage }) => {
    await expect(microstorePage.quantitySelector).toBeHidden()
  })
})
