import { CommerceLayerClient } from "@commercelayer/sdk"

export const updateOrderAttributes = async ({
  client,
  orderId,
  autorefresh,
  returnUrl,
}: {
  client: CommerceLayerClient
  orderId: string
  autorefresh: boolean
  returnUrl?: string
}) => {
  return await client.orders.update({
    id: orderId,
    autorefresh,
    return_url: returnUrl,
  })
}
