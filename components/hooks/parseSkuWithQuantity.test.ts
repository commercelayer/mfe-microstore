import { parseSkuWithQuantity } from "./useDataFromUrl"

describe("parse optional quantity form sku in url", () => {
  test("quantity is optional", () => {
    const { skuCode, quantity } = parseSkuWithQuantity("SKUCODE")

    expect(skuCode).toBe("SKUCODE")
    expect(quantity).toBe(0)
  })

  test("quantity can be blank", () => {
    const { skuCode, quantity } = parseSkuWithQuantity("SKUCODE:")

    expect(skuCode).toBe("SKUCODE")
    expect(quantity).toBe(0)
  })

  test("should trim white spaces in sku code", () => {
    const { skuCode, quantity } = parseSkuWithQuantity(" SKUCODE :2")

    expect(skuCode).toBe("SKUCODE")
    expect(quantity).toBe(2)
  })

  test("should trim white spaces also in quanity code", () => {
    const { skuCode, quantity } = parseSkuWithQuantity("SKUCODE : 2 ")

    expect(skuCode).toBe("SKUCODE")
    expect(quantity).toBe(2)
  })

  test("should have numeric quanity", () => {
    const { skuCode, quantity } = parseSkuWithQuantity("SKUCODE:3")

    expect(skuCode).toBe("SKUCODE")
    expect(quantity).toBe(3)
  })

  test("should ignore not numeric quantity", () => {
    const { skuCode, quantity } = parseSkuWithQuantity("SKUCODE:TWO")

    expect(skuCode).toBe("SKUCODE")
    expect(quantity).toBe(0)
  })

  test("should ignore not numeric quantity", () => {
    const { skuCode, quantity } = parseSkuWithQuantity(":TWO")

    expect(skuCode).toBe("")
    expect(quantity).toBe(0)
  })
})
