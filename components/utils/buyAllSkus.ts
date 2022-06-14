import CommerceLayer from "@commercelayer/sdk"

import { createLineItems } from "./createLineItems"
import { getOrCreateOrderId } from "./getOrCreateOrderId"
import { makeCartUrl } from "./makeCartUrl"
import { updateOrderAttributes } from "./updateOrderAttributes"

export const buyAllSkus = async ({
  skus,
  accessToken,
  slug,
  domain,
}: {
  skus: { skuCode: string; quantity: number }[]
  accessToken: string
  slug: string
  domain: string
}) => {
  const client = CommerceLayer({
    organization: slug,
    accessToken: accessToken,
    domain,
  })

  const orderId = await getOrCreateOrderId(client, slug)

  await updateOrderAttributes({ client, orderId, autorefresh: false })
  await createLineItems({ client, skus, orderId })
  const updatedOrder = await updateOrderAttributes({
    client,
    orderId,
    autorefresh: true,
    cartUrl: makeCartUrl({ basePath: "cart", orderId, accessToken }),
    returnUrl: window.location.href,
  })

  return updatedOrder
}
