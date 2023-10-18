import { CommerceLayerClient } from "@commercelayer/sdk"

export const removeAllLineItems = async ({
  client,
  orderId,
}: {
  client: CommerceLayerClient
  orderId: string
}) => {
  const { line_items: lineItems } = await client.orders.retrieve(orderId, {
    fields: ["line_items"],
    include: ["line_items"],
  })
  if (lineItems && lineItems?.length > 0) {
    await Promise.all(
      lineItems.map(async (lineItem) => {
        await client.line_items.delete(lineItem.id)
      })
    )
  }

  return orderId
}
