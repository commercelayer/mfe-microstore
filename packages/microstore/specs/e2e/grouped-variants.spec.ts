import { expect, test } from "../fixtures/tokenizedPage"

test.describe("With variants grouped by sku.reference", () => {
  test.use({
    defaultParams: {
      skuListId: process.env.E2E_SKU_LIST_ID_WITH_GROUPED_VARIANTS,
    },
  })

  test("should be able to change SKU from variant selector", async ({
    microstorePage,
  }) => {
    // first variant pre-selected
    expect(
      await microstorePage.page.getByText(
        "White Men Long Sleeve Shirt with Black Logo"
      )
    ).toBeDefined()

    // change variant
    expect(microstorePage.variantSelector).toBeVisible()
    await microstorePage.variantSelector.selectOption({
      index: 1,
    })

    expect(
      await microstorePage.page.getByText(
        "Black Unisex 3/4 Sleeve Shirt with White Logo"
      )
    ).toBeDefined()
  })
})
