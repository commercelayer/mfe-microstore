import { FC } from "react"

import { QuantityInput } from "./QuantityInput"

// we need  this component so we can retrieve the sku
export const QuantitySelector: FC<{
  skuCode: string
  quantityAvailable: number
}> = ({ skuCode, quantityAvailable }) => {
  return (
    <QuantityInput
      skuCode={`${skuCode}`}
      quantityAvailable={quantityAvailable}
      key={`${skuCode}`}
    />
  )
}
