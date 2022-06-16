import { QuantitySelector } from "@commercelayer/react-components"
import { FC, useState, MouseEvent, ChangeEvent, useEffect } from "react"

import { useBuyAll } from "components/data/BuyAllProvider"
import { Select } from "components/ui/Select"

import { createSelectOptions } from "./createSelectOptions"

interface Props {
  defaultValue: number
  skuCode: string
}

const MAX_OPTIONS = 10

export const QuantityInput: FC<Props> = ({ defaultValue, skuCode }) => {
  const [quantityValue, setQuantityValue] = useState(defaultValue)

  // keep buy all quantity in sync
  const { updateQuantity } = useBuyAll()
  useEffect(() => {
    if (quantityValue && quantityValue !== defaultValue) {
      updateQuantity({ skuCode, quantity: quantityValue })
    }
  }, [quantityValue])

  return (
    <QuantitySelector defaultValue={quantityValue.toString()}>
      {({ handleChange, max = MAX_OPTIONS }) => {
        const options = createSelectOptions(max)
        const onQuantityChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
          const newQty = parseInt(e.currentTarget.value, 10)
          setQuantityValue(newQty)
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
            {!options.includes(defaultValue) ? (
              <option value={defaultValue}> {defaultValue}</option>
            ) : null}
          </Select>
        ) : null
      }}
    </QuantitySelector>
  )
}
