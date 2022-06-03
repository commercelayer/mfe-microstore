import { test, expect } from "../fixtures/tokenizedPage"

test("should navigate to 404", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("text=This page could not be found.")).toBeVisible()
})

test("should navigate to the 404 page with wrong url", async ({ page }) => {
  await page.goto("/Asdakfrsf")
  await expect(page.locator("text=This page could not be found.")).toBeVisible()
})

test("should navigate to no skus", async ({ microstorePage }) => {
  await expect(microstorePage.page.locator("text=No skus")).toBeVisible()
})

test.describe("with skus", () => {
  test.use({
    defaultParams: {
      skus: "APPTESLA",
    },
  })

  test("should navigate to microstore", async ({ microstorePage }) => {
    await microstorePage.expectAppTitle()
  })
})
