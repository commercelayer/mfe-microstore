import { transformUrlDataToQueryObject } from "./useDataFromUrl"

describe("Transform url structured data", () => {
  test("should return a proper router query object without undefined values", () => {
    const query = transformUrlDataToQueryObject({
      skus: [
        { skuCode: "SKUCODE", quantity: 5 },
        { skuCode: "ABC123", quantity: 0 },
      ],
      cart: true,
      description: "Lorem ipsum",
      accessToken: "eyJhbGciO",
      couponCode: undefined,
      inline: undefined,
    })

    expect(query).toMatchObject({
      skus: "SKUCODE:5,ABC123:0",
      cart: true,
      description: "Lorem ipsum",
      accessToken: "eyJhbGciO",
    })
  })

  test("empty Skus", () => {
    const query = transformUrlDataToQueryObject({
      skus: [],
      cart: true,
      inline: false,
    })

    expect(query).toMatchObject({
      cart: true,
      inline: false,
    })
  })
})
