import { CommerceLayerClient, LineItem } from "@commercelayer/sdk"

import { SkuWithQuantity } from "@typings/urlData"

export const createLineItems = async ({
  client,
  skus,
  orderId,
}: {
  client: CommerceLayerClient
  skus: SkuWithQuantity[]
  orderId: string
}) => {
  const lineItems: LineItem[] = []
  await skus.reduce(
    async (nextRequest, { sku, quantity }) => {
      await nextRequest
      return client.line_items
        .create({
          sku_code: sku.code,
          quantity,
          order: client.orders.relationship(orderId),
        })
        .then((item) => {
          lineItems.push(item)
          return item
        })
    },
    Promise.resolve(null) as Promise<LineItem | null>
  )

  return lineItems
}
