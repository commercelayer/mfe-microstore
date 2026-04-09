import { authenticate } from "@commercelayer/js-auth"
import { test, expect } from "@playwright/test"

import { MicrostorePage } from "../fixtures/MicrostorePage"

const getToken = async () => {
  const data = await authenticate("client_credentials", {
    clientId: process.env.E2E_CLIENT_ID as string,
    scope: process.env.E2E_MARKET_ID as string,
  })
  return data?.accessToken as string
}

const captureOrderRequests = async (
  page: ConstructorParameters<typeof MicrostorePage>[0]
) => {
  const captured: Array<{ method: string; body: ReturnType<Request["json"]> }> =
    []
  await page.route("**/api/orders/**", async (route, request) => {
    if (["POST", "PATCH"].includes(request.method())) {
      captured.push({
        method: request.method(),
        body: request.postDataJSON(),
      })
    }
    await route.continue()
  })
  return captured
}

test.describe("linkId URL param is propagated to the order metadata", () => {
  test("should set linkId in order metadata on page load (cart inline mode)", async ({
    page,
  }) => {
    const microstorePage = new MicrostorePage(page)
    const capturedRequests = await captureOrderRequests(page)

    const accessToken = await getToken()
    await microstorePage.goto({
      accessToken,
      skuListId: process.env.E2E_SKU_LIST_ID,
      cart: true,
      inline: true,
      linkId: "test-link-id-cart",
    })

    const hasLinkId = capturedRequests.some(
      (req) =>
        (req.body as any)?.data?.attributes?.metadata?.links_api?.link_id ===
        "test-link-id-cart"
    )
    expect(hasLinkId).toBe(true)
  })

  test("should set linkId in order metadata when using buy all", async ({
    page,
  }) => {
    const microstorePage = new MicrostorePage(page)
    const capturedRequests = await captureOrderRequests(page)

    const accessToken = await getToken()
    await microstorePage.goto({
      accessToken,
      skuListId: process.env.E2E_SKU_LIST_ID,
      all: true,
      linkId: "test-link-id-buyall",
    })

    await microstorePage.buyAllButton.click()
    await page.waitForLoadState("networkidle")

    const hasLinkId = capturedRequests.some(
      (req) =>
        (req.body as any)?.data?.attributes?.metadata?.links_api?.link_id ===
        "test-link-id-buyall"
    )
    expect(hasLinkId).toBe(true)
  })
})
