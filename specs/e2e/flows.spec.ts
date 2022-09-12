import { getSalesChannelToken } from "@commercelayer/js-auth"

import { test, expect } from "../fixtures/tokenizedPage"

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT as string
const organizationSlug = new URL(endpoint).hostname.split(".")[0]
const scope = process.env.NEXT_PUBLIC_MARKET_ID as string
const skuListId = process.env.E2E_SKU_LIST_ID as string

const makeRemoteUrl = async ({
  cart,
  all,
  inline,
}: {
  cart: boolean
  all: boolean
  inline: boolean
}) => {
  const auth = await getSalesChannelToken({
    clientId,
    endpoint,
    scope,
  })
  const token = auth?.accessToken as string
  return `https://${organizationSlug}.commercelayer.app/microstore/list/${skuListId}?accessToken=${token}&cart=${cart}&all=${all}&inline=${inline}`
}

test("hosted flow: microstore > cart > checkout", async ({ page }) => {
  const remoteUrl = await makeRemoteUrl({
    cart: true,
    all: false,
    inline: false,
  })
  // microstore
  await page.goto(remoteUrl)
  await page.waitForFunction(() => document.title.includes("Microstore"))
  await page.locator("[data-test-id=button-add-to-cart]").first().click()
  // hosted cart
  await page.waitForFunction(() => document.title.includes("Your Cart"))
  await page.locator("[data-test-id=button-checkout]").click()
  // hosted checkout
  await page.waitForFunction(() => document.title.includes("Checkout"))
})

test("hosted flow: microstore > buyall > checkout", async ({ page }) => {
  const remoteUrl = await makeRemoteUrl({
    cart: false,
    all: true,
    inline: false,
  })
  // microstore
  await page.goto(remoteUrl)
  await page.waitForFunction(() => document.title.includes("Microstore"))
  await page.locator("[data-test-id=button-buy-all]").first().click()
  // checkout
  await page.waitForFunction(() => document.title.includes("Checkout"))
})

test("hosted flow: microstore > inline cart > cart > checkout", async ({
  page,
}) => {
  const remoteUrl = await makeRemoteUrl({
    cart: true,
    all: false,
    inline: true,
  })
  // microstore
  await page.goto(remoteUrl)
  await page.waitForFunction(() => document.title.includes("Microstore"))
  await expect(page.locator("[data-test-id=cart-items-count]")).toBeHidden()
  await page.locator("[data-test-id=button-add-to-cart-inline]").first().click()
  await expect(page.locator("[data-test-id=cart-items-count]")).toBeVisible()
  await page.locator("[data-test-id=link-view-cart]").click()
  // cart
  await page.waitForFunction(() => document.title.includes("Your Cart"))
  await page.locator("[data-test-id=button-checkout]").click()
  // checkout
  await page.waitForFunction(() => document.title.includes("Checkout"))
})

test("hosted flow: microstore > cart > back to microstore > cart > checkout > back to cart", async ({
  page,
}) => {
  const remoteUrl = await makeRemoteUrl({
    cart: true,
    all: false,
    inline: false,
  })
  // microstore
  await page.goto(remoteUrl)
  await page.waitForFunction(() => document.title.includes("Microstore"))
  await page.locator("[data-test-id=button-add-to-cart]").first().click()
  // cart
  await page.waitForFunction(() => document.title.includes("Your Cart"))
  await page.locator("[data-test-id=return-url]").click()
  // back to microstore
  await page.waitForFunction(() => document.title.includes("Microstore"))
  await page.locator("[data-test-id=button-add-to-cart]").first().click()
  // back to cart
  await page.waitForFunction(() => document.title.includes("Your Cart"))
  await page.locator("[data-test-id=button-checkout]").click()
  // checkout
  await page.waitForFunction(() => document.title.includes("Checkout"))
  await page.locator("[data-test-id=edit-cart-link] > a").click()
  // back to cart
  await page.waitForFunction(() => document.title.includes("Your Cart"))
  await page.locator("[data-test-id=button-checkout]").click()
  // checkout
  await page.waitForFunction(() => document.title.includes("Checkout"))
})
