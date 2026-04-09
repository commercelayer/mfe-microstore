import type { CommerceLayerClient } from "@commercelayer/sdk"

export const updateOrderAttributes = async ({
  client,
  orderId,
  autorefresh,
  returnUrl,
  linkId,
}: {
  client: CommerceLayerClient
  orderId: string
  autorefresh: boolean
  returnUrl?: string
  linkId?: string
}) => {
  return await client.orders.update({
    id: orderId,
    autorefresh,
    return_url: returnUrl,
    ...(linkId != null && {
      metadata: { links_api: { link_id: linkId } },
    }),
  })
}
