import CommerceLayer from "@commercelayer/sdk"

import { createLineItems } from "./createLineItems"
import { getOrCreateOrderId } from "./getOrCreateOrderId"
import { makeHostedAppUrl } from "./makeHostedAppUrl"
import { removeAllLineItems } from "./removeAllLineItems"
import { updateOrderAttributes } from "./updateOrderAttributes"

export const buyAllSkus = async ({
  skus,
  accessToken,
  slug,
  domain,
  setCartUrl,
}: {
  skus: { skuCode: string; quantity: number }[]
  accessToken: string
  slug: string
  domain: string
  setCartUrl?: boolean
}) => {
  const client = CommerceLayer({
    organization: slug,
    accessToken: accessToken,
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
    cartUrl: setCartUrl
      ? makeHostedAppUrl({ basePath: "cart", orderId, accessToken })
      : undefined,
    returnUrl: window.location.href,
  })

  return updatedOrder
}
