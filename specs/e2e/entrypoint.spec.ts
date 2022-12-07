import { test, expect } from "../fixtures/tokenizedPage"

test("should navigate to 404", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("text=404")).toBeVisible()
})

test("should navigate to the 404 page with wrong url", async ({ page }) => {
  await page.goto("/microstore/Asdakfrsf")
  await expect(page.locator("text=404")).toBeVisible()
})

test.describe("sku list with items", () => {
  test.use({
    defaultParams: {
      skuListId: process.env.E2E_SKU_LIST_ID,
    },
  })

  test("should navigate to microstore", async ({ microstorePage }) => {
    await microstorePage.expectAppTitle()
    await microstorePage.expectBuyNowButton()
  })
})

test.describe("empty sku list", () => {
  test.use({
    defaultParams: {
      skuListId: process.env.E2E_EMPTY_SKU_LIST_ID,
    },
  })
  test("should navigate to empty sku list", async ({ microstorePage }) => {
    await expect(
      microstorePage.page.locator("data-test-id=no-skus-found")
    ).toBeVisible()
  })
})
