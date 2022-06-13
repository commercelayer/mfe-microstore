import { parseQuerySkuValue } from "./useDataFromUrl"

describe("parse list of skus from url", () => {
  test("should return a list of sku objects", () => {
    const skus = parseQuerySkuValue("SKUCODE,SECOND-SKU,ANOTHER_SKU")
    expect(skus.length).toBe(3)
    expect(skus[0].skuCode).toBe("SKUCODE")
    expect(skus[1].skuCode).toBe("SECOND-SKU")
    expect(skus[2].skuCode).toBe("ANOTHER_SKU")
  })

  test("should ignore empty skus", () => {
    const skus = parseQuerySkuValue("SKUCODE,,ANOTHER_SKU")
    expect(skus.length).toBe(2)
    expect(skus[0].skuCode).toBe("SKUCODE")
    expect(skus[1].skuCode).toBe("ANOTHER_SKU")
  })

  test("should ignore empty skus at any place", () => {
    const skus = parseQuerySkuValue(",,ANOTHER_SKU")
    expect(skus.length).toBe(1)
    expect(skus[0].skuCode).toBe("ANOTHER_SKU")
  })

  test("should accept quantity for some skus", () => {
    const skus = parseQuerySkuValue("SKUCODE:1,ABC")
    expect(skus.length).toBe(2)
    expect(skus[0]).toMatchObject({ skuCode: "SKUCODE", quantity: 1 })
    expect(skus[1]).toMatchObject({ skuCode: "ABC", quantity: 0 })
  })

  test("should ignore broken values", () => {
    const skus = parseQuerySkuValue(":ABCD,SKUCODE:3")
    expect(skus.length).toBe(1)
    expect(skus[0]).toMatchObject({ skuCode: "SKUCODE", quantity: 3 })
  })

  test("should ignore broken values also when is the only one", () => {
    const skus = parseQuerySkuValue(":44")
    expect(skus.length).toBe(0)
  })
})
