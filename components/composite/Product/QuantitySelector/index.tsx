import { SkuField } from "@commercelayer/react-components"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"

import { QuantityInput } from "./QuantityInput"

export const QuantitySelector = () => {
  const { skus } = useDataFromUrl()

  return (
    <SkuField attribute="code" tagElement="span">
      {({ attributeValue: skuCode }) => {
        const defaultQuantity = skus.find(
          (o) => skuCode === o.skuCode
        )?.quantity

        if (!defaultQuantity) {
          // we don't want to show quantity selector is quantity option is not passed in url as SKUCODE:QTY
          return null
        }

        return <QuantityInput defaultValue={defaultQuantity} />
      }}
    </SkuField>
  )
}
