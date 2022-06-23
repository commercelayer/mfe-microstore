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
    // stub window.location.href
    global.window = Object.create(window)
    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost:3000/microstore",
      },
    })

    const url = makeHostedAppUrl({
      hostedApp: "cart",
      accessToken: "eyJhbGciOiUzUxM",
      orderId: "weWdhV2zpx",
    })

    expect(url).toBe(
      "http://localhost:3000/cart/weWdhV2zpx?accessToken=eyJhbGciOiUzUxM"
    )
  })
})
