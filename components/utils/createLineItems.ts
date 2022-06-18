import { CommerceLayerClient, LineItem } from "@commercelayer/sdk"

export const createLineItems = async ({
  client,
  skus,
  orderId,
}: {
  client: CommerceLayerClient
  skus: { skuCode: string; quantity: number }[]
  orderId: string
}) => {
  const lineItems: LineItem[] = []
  await skus.reduce(async (nextRequest, { skuCode, quantity }) => {
    await nextRequest
    return client.line_items
      .create({
        sku_code: skuCode,
        quantity,
        order: client.orders.relationship(orderId),
      })
      .then((item) => {
        lineItems.push(item)
        return item
      })
  }, Promise.resolve(null) as Promise<LineItem | null>)

  return lineItems
}
