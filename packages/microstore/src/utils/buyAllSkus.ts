import type { SkuWithQuantity } from "@typings/urlData"
import { createLineItems } from "./createLineItems"
import { getOrCreateOrderId } from "./getOrCreateOrderId"
import { makeClient } from "./makeClient"
import { removeAllLineItems } from "./removeAllLineItems"
import { updateOrderAttributes } from "./updateOrderAttributes"

export const buyAllSkus = async ({
  skus,
  accessToken,
  slug,
  linkId,
}: {
  skus: SkuWithQuantity[]
  accessToken: string
  slug: string
  linkId?: string
}) => {
  const client = makeClient(accessToken)

  const orderId = await getOrCreateOrderId(client, slug)

  await updateOrderAttributes({ client, orderId, autorefresh: false, linkId })
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
