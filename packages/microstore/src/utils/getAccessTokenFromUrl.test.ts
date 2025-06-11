/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessTokenFromUrl } from "./getAccessTokenFromUrl"

describe("Read JWT from URL", () => {
  const { location } = window
  beforeAll(function clearLocation() {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...location,
        href: "http://domain.com",
        search: "",
      },
    })
  })
  afterAll(function resetLocation() {
    window.location.href = location.href
  })

  test("accessToken is in URL query string", () => {
    window.location.search = "?accessToken=eyJhbGciOiJIUzUxMiJ9"
    expect(getAccessTokenFromUrl()).toBe("eyJhbGciOiJIUzUxMiJ9")
  })

  test("accessToken is not part of URL query string", () => {
    window.location.search = "?someOtherParam=foobar"
    expect(getAccessTokenFromUrl()).toBe(undefined)
  })

  test("Query string is empty", () => {
    window.location.search = ""
    expect(getAccessTokenFromUrl()).toBe(undefined)
  })
})
