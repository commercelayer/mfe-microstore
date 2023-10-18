import { isValidHost, makeSubdomain } from "./isValidHost"

const jwtSalesChannelOrgAcme =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJhYmMxMjM0Iiwic2x1ZyI6ImFjbWUifSwiYXBwbGljYXRpb24iOnsiaWQiOiJiY2Q0NDIxIiwia2luZCI6InNhbGVzX2NoYW5uZWwiLCJwdWJsaWMiOnRydWV9LCJ0ZXN0Ijp0cnVlLCJleHAiOjE2NTI3OTUxMDIsInJhbmQiOjAuMzE0NTUwMDUwMTg4ODYzOH0.mX4A08-f_vdab6_dDpA1eDdGri91kR0erP8X7obZr1M"

const jwtIntegrationOrgAcme =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJhYmMxMjM0Iiwic2x1ZyI6ImFjbWUifSwiYXBwbGljYXRpb24iOnsiaWQiOiJiY2Q0NDIxIiwia2luZCI6ImludGVncmF0aW9uIiwicHVibGljIjp0cnVlfSwidGVzdCI6dHJ1ZSwiZXhwIjoxNjUyNzk1MTAyLCJyYW5kIjowLjMxNDU1MDA1MDE4ODg2Mzh9.D0dbc7W9N7S3NksbbffZVkD85TyrHPAmYYQOEZO8-jA"

describe("Is valid host", () => {
  test("Parse hostname to get the subdomain", () => {
    const subdomain = makeSubdomain("acme.commercelayer.app")
    expect(subdomain).toBe("acme")
  })

  test("Subdomain matches organization slug and JWT kind is for sales channel", () => {
    expect(
      isValidHost({
        hostname: "acme.commercelayer.app",
        accessToken: jwtSalesChannelOrgAcme,
      })
    ).toBe(true)
  })

  test("Check for wrong channel/kind in JWT", () => {
    expect(
      isValidHost({
        hostname: "acme.commercelayer.app",
        accessToken: jwtIntegrationOrgAcme,
      })
    ).toBe(false)
  })

  test("Hostname does not match JWT organization in hosted production", () => {
    expect(
      isValidHost({
        hostname: "akme.commercelayer.app",
        accessToken: jwtSalesChannelOrgAcme,
        forceProductionEnv: true,
      })
    ).toBe(false)
  })

  test("Hostname does not match JWT organization in development", () => {
    expect(
      isValidHost({
        hostname: "akme.commercelayer.app",
        accessToken: jwtSalesChannelOrgAcme,
        forceProductionEnv: false,
      })
    ).toBe(true)
  })
})
