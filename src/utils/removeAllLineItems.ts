import { CommerceLayerClient } from "@commercelayer/sdk"

export const removeAllLineItems = async ({
  client,
  orderId,
}: {
  client: CommerceLayerClient
  orderId: string
}) => {
  const { line_items } = await client.orders.retrieve(orderId, {
    fields: ["line_items"],
    include: ["line_items"],
  })
  if (line_items && line_items?.length > 0) {
    await Promise.all(
      line_items.map(async (lineItem) => {
        await client.line_items.delete(lineItem.id)
      })
    )
  }

  return orderId
}
