import { CommerceLayerClient } from "@commercelayer/sdk"

export const updateOrderAttributes = async ({
  client,
  orderId,
  autorefresh,
  cartUrl,
  returnUrl,
}: {
  client: CommerceLayerClient
  orderId: string
  autorefresh: boolean
  cartUrl?: string
  returnUrl?: string
}) => {
  return await client.orders.update({
    id: orderId,
    _refresh: true,
    autorefresh,
    cart_url: cartUrl,
    return_url: returnUrl,
  })
}
