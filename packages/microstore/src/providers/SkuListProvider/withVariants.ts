import { SkuWithQuantity } from "@typings/urlData"

/**
 * @returns if an array of SKUs should be treated as products with variants
 *
 * @param skus - The fetched SKUs resource object returned from SDK
 */
export const withVariants = (skus: SkuWithQuantity[]): boolean => {
  const grouped = skus.reduce(function (r, a) {
    const k = a.sku.reference || "noReference"
    r[k] = r[k] || []
    r[k].push(a)
    return r
  }, Object.create(null))
  if (
    Object.keys(grouped).length === 1 &&
    Object.keys(grouped)[0] === "noReference"
  ) {
    return false
  }

  if (Object.keys(grouped).length === skus.length) {
    return false
  }

  return true
}
