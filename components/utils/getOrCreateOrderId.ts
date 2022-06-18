import { CommerceLayerClient } from "@commercelayer/sdk"

import { makePersistentOrderKey } from "./makePersistentOrderKey"

export const getOrCreateOrderId = async (
  client: CommerceLayerClient,
  slug: string
) => {
  const localStorageKey = makePersistentOrderKey(slug)
  let orderId = localStorage.getItem(localStorageKey)

  if (!orderId) {
    const order = await client.orders.create({ autorefresh: false })
    orderId = order.id
    window.localStorage.setItem(localStorageKey, orderId)
  }

  return orderId
}
