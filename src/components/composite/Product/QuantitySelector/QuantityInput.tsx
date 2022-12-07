import { QuantitySelector } from "@commercelayer/react-components"
import { FC, MouseEvent, ChangeEvent } from "react"

import { createSelectOptions } from "./createSelectOptions"

import { Select } from "#components/ui/Select"
import { useBuyAll } from "#providers/BuyAllProvider"

interface Props {
  skuCode: string
}

const MAX_OPTIONS = 10

export const QuantityInput: FC<Props> = ({ skuCode }) => {
  const { updateQuantity, skus } = useBuyAll()
  const quantityValue = skus.find((o) => skuCode === o.skuCode)?.quantity || 0

  if (!quantityValue) {
    return null
  }

  return (
    <QuantitySelector value={quantityValue.toString()}>
      {({ handleChange, max = MAX_OPTIONS }) => {
        const options = createSelectOptions(max)
        const onQuantityChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
          updateQuantity({
            skuCode,
            quantity: parseInt(e.currentTarget.value, 10),
          })
          handleChange(e as unknown as MouseEvent<HTMLInputElement>)
        }

        return options.length > 0 ? (
          <Select
            value={quantityValue}
            onChange={onQuantityChangeHandler}
            data-test-id="quantity-selector"
          >
            {options.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
            {/* appending default value if not in options range */}
            {!options.includes(quantityValue) ? (
              <option value={quantityValue}>{quantityValue}</option>
            ) : null}
          </Select>
        ) : null
      }}
    </QuantitySelector>
  )
}
