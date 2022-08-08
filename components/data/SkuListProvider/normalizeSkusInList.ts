import { SkuList } from "@commercelayer/sdk"

export const normalizeSkusInList = (skuList: SkuList): SkuWithQuantity[] => {
  return skuList.manual
    ? (skuList.sku_list_items || []).map((item) => ({
      skuCode: item.sku_code || "",
      quantity: item.quantity || 1,
    }))
    : (skuList.skus || []).map((item) => ({
      skuCode: item.code || "",
      quantity: 1,
    }))
}
