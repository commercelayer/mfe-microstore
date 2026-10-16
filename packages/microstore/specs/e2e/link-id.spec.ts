import { authenticate } from "@commercelayer/js-auth"
import { expect, test } from "@playwright/test"
import { ENV } from "varlock/env"

import { MicrostorePage } from "../fixtures/MicrostorePage"

const getToken = async () => {
  const data = await authenticate("client_credentials", {
    clientId: ENV.E2E_CLIENT_ID,
    scope: ENV.E2E_MARKET_ID,
    domain: ENV.E2E_DOMAIN,
  })
  return data?.accessToken as string
}

const captureOrderRequests = async (
  page: ConstructorParameters<typeof MicrostorePage>[0],
) => {
  const captured: Array<{ method: string; body: ReturnType<Request["json"]> }> =
    []
  // matches both `/api/orders` and versioned `/api/2026-05/orders/:id`
  await page.route(
    /\/api\/(?:[\d-]+\/)?orders(?:\/|\?|$)/,
    async (route, request) => {
      if (["POST", "PATCH"].includes(request.method())) {
        captured.push({
          method: request.method(),
          body: request.postDataJSON(),
        })
      }
      await route.continue()
    },
  )
  return captured
}

test.describe("linkId URL param is propagated to the order metadata", () => {
  test("should set linkId in order metadata when adding to cart (cart inline mode)", async ({
    page,
  }) => {
    const microstorePage = new MicrostorePage(page)
    const capturedRequests = await captureOrderRequests(page)

    const accessToken = await getToken()
    await microstorePage.goto({
      accessToken,
      skuListId: ENV.E2E_SKU_LIST_ID,
      cart: true,
      inline: true,
      linkId: "test-link-id-cart",
    })

    // the order is created lazily, on first add to cart
    await microstorePage.addItemToCart({ inline: true })
    await microstorePage.checkCartItemsCount(12)

    const hasLinkId = capturedRequests.some(
      (req) =>
        (req.body as any)?.data?.attributes?.metadata?.links_api?.link_id ===
        "test-link-id-cart",
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
      skuListId: ENV.E2E_SKU_LIST_ID,
      all: true,
      linkId: "test-link-id-buyall",
    })

    await microstorePage.buyAllButton.click()

    await expect
      .poll(() =>
        capturedRequests.some(
          (req) =>
            (req.body as any)?.data?.attributes?.metadata?.links_api
              ?.link_id === "test-link-id-buyall",
        ),
      )
      .toBe(true)
  })
})
