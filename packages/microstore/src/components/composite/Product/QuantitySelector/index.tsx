import { FC } from "react"

import { QuantityInput } from "./QuantityInput"

// we need  this component so we can retrieve the sku
export const QuantitySelector: FC<{ skuCode: string }> = ({ skuCode }) => {
  return <QuantityInput skuCode={`${skuCode}`} key={`${skuCode}`} />
}
