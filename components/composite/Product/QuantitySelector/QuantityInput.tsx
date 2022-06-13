import { QuantitySelector } from "@commercelayer/react-components"
import { FC, useState, MouseEvent } from "react"

import { createSelectOptions } from "./createSelectOptions"

interface Props {
  defaultValue: number
}

const MAX_OPTIONS = 10

export const QuantityInput: FC<Props> = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <QuantitySelector>
      {({ handleChange, max = MAX_OPTIONS }) => {
        const options = createSelectOptions(max)

        return options.length > 0 ? (
          <select
            value={value}
            onChange={(e) => {
              setValue(parseInt(e.currentTarget.value, 10))
              handleChange(e as unknown as MouseEvent<HTMLInputElement>)
            }}
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
