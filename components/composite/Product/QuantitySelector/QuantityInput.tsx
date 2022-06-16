import { QuantitySelector } from "@commercelayer/react-components"
import { FC, useState, MouseEvent, ChangeEvent } from "react"

import { Select } from "components/ui/Select"

import { createSelectOptions } from "./createSelectOptions"

interface Props {
  defaultValue: number
}

const MAX_OPTIONS = 10

export const QuantityInput: FC<Props> = ({ defaultValue }) => {
  const [quantityValue, setQuantityValue] = useState(defaultValue)

  return (
    <QuantitySelector value={quantityValue.toString()}>
      {({ handleChange, max = MAX_OPTIONS }) => {
        const options = createSelectOptions(max)
        const onQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
          setQuantityValue(parseInt(e.currentTarget.value, 10))
          handleChange(e as unknown as MouseEvent<HTMLInputElement>)
        }

        return options.length > 0 ? (
          <Select
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
          </Select>
        ) : null
      }}
    </QuantitySelector>
  )
}
