import {
  CommerceLayerClient,
  Price,
  QueryParamsList,
  Sku,
  SkuList,
} from "@commercelayer/sdk"

import { SkuWithPrices } from "."

import { SkuWithQuantity } from "@typings/urlData"

const skuFields = {
  skus: [
    "code",
    "reference",
    "name",
    "description",
    "metadata",
    "image_url",
    "prices",
  ] satisfies (keyof Sku)[],
  prices: [
    "formatted_amount",
    "formatted_compare_at_amount",
    "compare_at_amount_float",
    "amount_float",
  ] satisfies (keyof Price)[],
}

/**
 * From a SKU List resource object, fetch the SKUs with their quantity.
 *
 * If the SKU List is manual, it will fetch the `sku_list_items`, sorted by position,
 * including the related `sku` and its `prices` and set the quantity based on the `sku_list_items` quantity.
 *
 * If the SKU List is not manual (regex), it will fetch the `skus` directly
 * since `sku_list_items` are not available and set quantity to a fixed 1.
 */
export async function getSkusWithQuantity({
  skuList,
  cl,
  itemsLimit,
}: {
  skuList: SkuList
  cl: CommerceLayerClient
  itemsLimit: number
}): Promise<SkuWithQuantity[]> {
  const pageSize = (
    itemsLimit <= 25 ? itemsLimit : 25
  ) as QueryParamsList["pageSize"]
  if (skuList.manual === true) {
    const items = await cl.sku_lists.sku_list_items(skuList.id, {
      include: ["sku", "sku.prices"],
      fields: {
        sku_list_items: ["sku_code", "quantity", "position", "sku"],
        ...skuFields,
      },
      pageSize,
      sort: {
        position: "asc",
      },
    })

    return (items ?? []).map((item) => ({
      quantity: item.quantity || 1,
      sku: item.sku as SkuWithPrices,
    }))
  }

  const skus = await cl.sku_lists.skus(skuList.id, {
    fields: skuFields,
    include: ["prices"],
    pageSize,
  })
  return (skus ?? []).map((item) => ({
    quantity: 1,
    sku: item as SkuWithPrices,
  }))
}
