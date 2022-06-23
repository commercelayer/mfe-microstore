import { makeHostedAppUrl } from "./makeHostedAppUrl"

describe("makeHostedAppUrl", () => {
  test("should return a valid hosted checkout url", () => {
    const url = makeHostedAppUrl({
      hostedApp: "checkout",
      accessToken: "eyJhbGciOiUzUxM",
      orderId: "weWdhV2zpx",
      subdomain: "org-slug",
    })

    expect(url).toBe(
      "https://org-slug.checkout.commercelayer.app/weWdhV2zpx?accessToken=eyJhbGciOiUzUxM"
    )
  })

  test("should return a valid hosted cart url", () => {
    // mock window.location.href
    global.window = Object.create(window)
    Object.defineProperty(window, "location", {
      value: {
        href: "http://myorg.commercelayer.app/microstore?someUrlParam=xxxx",
      },
    })

    const url = makeHostedAppUrl({
      hostedApp: "cart",
      accessToken: "eyJhbGciOiUzUxM",
      orderId: "weWdhV2zpx",
    })

    expect(url).toBe(
      "http://myorg.commercelayer.app/cart/weWdhV2zpx?accessToken=eyJhbGciOiUzUxM"
    )
  })
})
