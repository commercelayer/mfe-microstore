import { QuantitySelector } from "@commercelayer/react-components"
import { useRouter } from "next/router"
import { FC, useState, MouseEvent, ChangeEvent, useEffect } from "react"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"

import { createSelectOptions } from "./createSelectOptions"

interface Props {
  defaultValue: number
  itemCode: string
}

const MAX_OPTIONS = 10

export const QuantityInput: FC<Props> = ({ defaultValue, itemCode }) => {
  const [quantityValue, setQuantityValue] = useState(defaultValue)
  const { skus, syncUrl } = useDataFromUrl()

  useEffect(
    function keepUrlInSyncWithQuantity() {
      if (skus?.length && quantityValue !== defaultValue) {
        syncUrl({
          skus: skus.map((s) =>
            s.skuCode === itemCode
              ? {
                  ...s,
                  quantity: quantityValue,
                }
              : s
          ),
        })
      }
    },
    [quantityValue]
  )

  return (
    <QuantitySelector value={quantityValue.toString()}>
      {({ handleChange, max = MAX_OPTIONS }) => {
        const options = createSelectOptions(max)
        const onQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
          setQuantityValue(parseInt(e.currentTarget.value, 10))
          handleChange(e as unknown as MouseEvent<HTMLInputElement>)
        }

        return options.length > 0 ? (
          <select
            value={quantityValue}
            onChange={onQuantityChange}
            data-test-id="quantity-selector"
          >
            {options.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
            {/* appending default value if not in options range */}
            {!options.includes(defaultValue) ? (
              <option value={defaultValue}> {defaultValue}</option>
            ) : null}
          </select>
        ) : null
      }}
    </QuantitySelector>
  )
}
