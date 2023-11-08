import { withVariants } from "./withVariants"

import { SkuWithQuantity } from "@typings/urlData"

const products: SkuWithQuantity[] = [
  {
    quantity: 1,
    sku: {
      code: "BASEBHAT000000FFFFFFXXXX",
      name: "Baseball Hat White",
      reference: "BASEBHAT",
      prices: [],
    },
  },
  {
    quantity: 1,
    sku: {
      code: "BASEBHATFFFFFF000000XXXX",
      name: "Baseball Hat Black",
      reference: "BASEBHAT",
      prices: [],
    },
  },
]

const multipleProducts: SkuWithQuantity[] = [
  {
    quantity: 1,
    sku: {
      code: "BASEBHAT000000FFFFFFXXXX",
      name: "Baseball Hat White",
      reference: "BASEBHAT",
    },
  },
  {
    quantity: 1,
    sku: {
      code: "BASEBHATFFFFFF000000XXXX",
      name: "Baseball Hat Black",
      reference: "BASEBHAT",
    },
  },
  {
    quantity: 1,
    sku: {
      code: "TSHIRTFFFFFF000000XXXX",
      name: "Tshirt White Small",
      reference: "TSHIRT",
    },
  },
  {
    quantity: 1,
    sku: {
      code: "TSHIRTFFFFFF000000XXMM",
      name: "Baseball Hat Medium",
      reference: "TSHIRT",
    },
  },
]

const skusMixedReference: SkuWithQuantity[] = [
  {
    quantity: 1,
    sku: {
      reference: "BASEBHAT",
      name: "Baseball Hat White",
      code: "BASEBHAT000000FFFFFFXXXX",
    },
  },
  {
    quantity: 1,
    sku: {
      code: "BASEBHATFFFFFF000000XXXX",
      name: "Baseball Hat Black",
      reference: "BASEBHAT",
    },
  },
  {
    sku: { code: "BASEBHATFFFFFF000000MMMM", name: "Baseball Hat Medium" },
    quantity: 1,
  },
]

const skusNoReference: SkuWithQuantity[] = [
  {
    sku: { name: "Baseball Hat White", code: "BASEBHAT000000FFFFFFXXXX" },
    quantity: 1,
  },
  {
    sku: { name: "Baseball Hat Black", code: "BASEBHATFFFFFF000000XXXX" },
    quantity: 1,
  },
]

const skus: SkuWithQuantity[] = [
  {
    sku: {
      name: "Baseball Hat White",
      code: "BASEBHATFFFFFF000000XXXX",
      reference: "sku_1",
    },
    quantity: 1,
  },
  {
    sku: {
      name: "Tshirt White",
      code: "TSHIRTFFFFFF000000XXXX",
      reference: "sku_2",
    },
    quantity: 1,
  },
]

describe("withVariants", () => {
  test("should return a true if products with variants", () => {
    const isWithVariants = withVariants(products)
    expect(isWithVariants).toBeTruthy()
  })

  test("should return a true if multiple products with variants", () => {
    const isWithVariants = withVariants(multipleProducts)
    expect(isWithVariants).toBeTruthy()
  })

  test("should return a false if skus without variants", () => {
    const isWithVariants = withVariants(skus)
    expect(isWithVariants).toBeFalsy()
  })

  test("should return a false if skus without reference", () => {
    const isWithVariants = withVariants(skusNoReference)
    expect(isWithVariants).toBeFalsy()
  })

  test("should return a true if skus with and without reference", () => {
    const isWithVariants = withVariants(skusMixedReference)
    expect(isWithVariants).toBeTruthy()
  })
})
