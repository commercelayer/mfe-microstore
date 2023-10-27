import { SkuList } from "@commercelayer/sdk"

/**
 * @returns a normalized array of SKU codes with quantity by checking
 * if SKU List has been configured with manual `sku_list_items` or with
 * a regex that populates a `skus` array
 *
 * @param skuList - The fetched sku_list resource object returned from SDK
 */
export const normalizeSkusInList = (skuList: SkuList): SkuWithQuantity[] => {
  return skuList.manual
    ? (skuList.sku_list_items || []).map((item) => {
        const sku = skuList.skus?.find((sku) => sku.code === item.sku_code)
        return {
          skuCode: item.sku_code || "",
          reference: sku?.reference,
          quantity: item.quantity || 1,
        }
      })
    : (skuList.skus || []).map((item) => ({
        skuCode: item.code || "",
        reference: item.reference,
        quantity: 1,
      }))
}
