import { CommerceLayerClient } from "@commercelayer/sdk"

export const removeAllLineItems = async ({
  client,
  orderId,
}: {
  client: CommerceLayerClient
  orderId: string
}) => {
  const lineItems = await client.orders.line_items(orderId)
  if (lineItems && lineItems?.length > 0) {
    await Promise.all(
      lineItems.map(async (lineItem) => {
        await client.line_items.delete(lineItem.id)
      })
    )
  }

  return orderId
}
