import { SkuField } from "@commercelayer/react-components"
import { FC } from "react"

import { QuantityInput } from "./QuantityInput"

// we need  this component so we can retrieve the sku
export const QuantitySelector: FC = () => {
  return (
    <SkuField attribute="code" tagElement="span">
      {({ attributeValue: skuCode }) => (
        <QuantityInput skuCode={`${skuCode}`} key={`${skuCode}`} />
      )}
    </SkuField>
  )
}
