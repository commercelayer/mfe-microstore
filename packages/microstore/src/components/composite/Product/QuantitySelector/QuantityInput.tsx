import { FC, ChangeEvent } from "react"

import { createSelectOptions } from "./createSelectOptions"

import { Select } from "#components/ui/Select"
import { useBuyAll } from "#providers/BuyAllProvider"

interface Props {
  skuCode: string
  quantityAvailable: number
}

const MAX_OPTIONS = 10

export const QuantityInput: FC<Props> = ({ skuCode, quantityAvailable }) => {
  const { updateQuantity, skus } = useBuyAll()
  const quantityValue = skus.find((o) => skuCode === o.sku.code)?.quantity || 0
  if (!quantityValue) {
    return null
  }

  const options = createSelectOptions(
    quantityAvailable > MAX_OPTIONS ? MAX_OPTIONS : quantityAvailable
  )
  const onQuantityChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const sku = skus.find((item) => item.sku.code === skuCode)?.sku
    if (sku) {
      updateQuantity({
        sku,
        quantity: parseInt(e.currentTarget.value, 10),
      })
    }
    // handleChange(e as unknown as MouseEvent<HTMLInputElement>)
  }

  return (
    <Select
      value={quantityValue}
      disabled={quantityAvailable <= 0}
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
  )
}
