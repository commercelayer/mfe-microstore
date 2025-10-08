import type { SkuWithQuantity } from "@typings/urlData"

/**
 * @returns if an array of SKUs should be treated as products with variants
 *
 * @param skus - The fetched SKUs resource object returned from SDK
 */
export const withVariants = (skus: SkuWithQuantity[]): boolean => {
  const grouped = groupedSkus(skus)
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

export const groupedSkus = (skus: SkuWithQuantity[]) => {
  return skus.reduce((r, a) => {
    const k =
      a.sku.reference != null && a.sku.reference.trim().length > 0
        ? a.sku.reference
        : `noReference-${Math.random().toString(36).substring(2, 15)}`
    r[k] = r[k] || []
    r[k].push(a)
    return r
  }, Object.create(null))
}
