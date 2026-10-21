import { ENV } from "varlock/env"
import { expect, test } from "../fixtures/tokenizedPage"

test.describe("Mini cart, with inline cart enabled", () => {
  test.use({
    defaultParams: {
      skuListId: ENV.E2E_SKU_LIST_ID,
      cart: true,
      inline: true,
    },
  })

  // Regression: HostedCart used to re-assign the iframe `src` on every render,
  // so each order refresh reloaded the cart, about once a second, forever.
  test("should not keep reloading the cart iframe after add to cart", async ({
    microstorePage,
  }) => {
    const { page } = microstorePage
    const cartNavigations: number[] = []
    page.on("framenavigated", (frame) => {
      if (frame !== page.mainFrame() && frame.url().includes("/cart/")) {
        cartNavigations.push(Date.now())
      }
    })

    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(12)
    await expect(page.locator("iframe[src*='/cart/']")).toHaveCount(1)

    // the cart loads on mount and once more when it opens, then settles
    await page.waitForTimeout(4000)
    const settledAt = Date.now()
    await page.waitForTimeout(5000)

    expect(cartNavigations.filter((at) => at >= settledAt)).toEqual([])
  })
})
