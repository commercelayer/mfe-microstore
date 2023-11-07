import { CommerceLayer } from "@commercelayer/sdk"

import { createLineItems } from "./createLineItems"
import { getOrCreateOrderId } from "./getOrCreateOrderId"
import { removeAllLineItems } from "./removeAllLineItems"
import { updateOrderAttributes } from "./updateOrderAttributes"

import { SkuWithQuantity } from "@typings/urlData"

export const buyAllSkus = async ({
  skus,
  accessToken,
  slug,
  domain,
}: {
  skus: SkuWithQuantity[]
  accessToken: string
  slug: string
  domain: string
}) => {
  const client = CommerceLayer({
    organization: slug,
    accessToken,
    domain,
  })

  const orderId = await getOrCreateOrderId(client, slug)

  await updateOrderAttributes({ client, orderId, autorefresh: false })
  await removeAllLineItems({ client, orderId })
  await createLineItems({ client, skus, orderId })
  const updatedOrder = await updateOrderAttributes({
    client,
    orderId,
    autorefresh: true,
    returnUrl: window.location.href,
  })

  return updatedOrder
}
