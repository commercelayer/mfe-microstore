import { SkuField } from "@commercelayer/react-components"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"

import { QuanityInput } from "./QuanityInput"

export const QuantitySelector = () => {
  const { skus } = useDataFromUrl()

  return (
    <SkuField attribute="code" tagElement="span">
      {/* TODO: wait for fix release in react-componnet */}
      {({ element: skuCode }) => {
        const defaultQuantity = skus.find(
          (o) => skuCode === o.skuCode
        )?.quantity

        if (!defaultQuantity) {
          // we don't want to show quantity selector is quantity option is not passed in url as SKUCODE:QTY
          return null
        }

        return <QuanityInput defaultValue={defaultQuantity} />
      }}
    </SkuField>
  )
}
