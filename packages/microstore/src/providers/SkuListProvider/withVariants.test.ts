import { withVariants } from "./withVariants"

const products: SkuWithQuantity[] = [
  { skuCode: "BASEBHAT000000FFFFFFXXXX", quantity: 1, reference: "BASEBHAT" },
  { skuCode: "BASEBHATFFFFFF000000XXXX", quantity: 1, reference: "BASEBHAT" },
]

const multipleProducts: SkuWithQuantity[] = [
  { skuCode: "BASEBHAT000000FFFFFFXXXX", quantity: 1, reference: "BASEBHAT" },
  { skuCode: "BASEBHATFFFFFF000000XXXX", quantity: 1, reference: "BASEBHAT" },
  { skuCode: "TSHIRTFFFFFF000000XXXX", quantity: 1, reference: "TSHIRT" },
  { skuCode: "TSHIRTFFFFFF000000XXXX", quantity: 1, reference: "TSHIRT" },
]

const skusMixedReference: SkuWithQuantity[] = [
  { skuCode: "BASEBHAT000000FFFFFFXXXX", quantity: 1, reference: "BASEBHAT" },
  { skuCode: "BASEBHATFFFFFF000000XXXX", quantity: 1, reference: "BASEBHAT" },
  { skuCode: "BASEBHATFFFFFF000000MMMM", quantity: 1 },
]

const skusNoReference: SkuWithQuantity[] = [
  { skuCode: "BASEBHAT000000FFFFFFXXXX", quantity: 1 },
  { skuCode: "BASEBHATFFFFFF000000XXXX", quantity: 1 },
]

const skus: SkuWithQuantity[] = [
  { skuCode: "BASEBHATFFFFFF000000XXXX", quantity: 1, reference: "sku_1" },
  { skuCode: "TSHIRTFFFFFF000000XXXX", quantity: 1, reference: "sku_2" },
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
