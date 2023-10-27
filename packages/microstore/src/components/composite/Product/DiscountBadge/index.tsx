import { Price } from "@commercelayer/sdk"
import { FC } from "react"

import { StyledBadge } from "./styled"

export const DiscountBadge: FC<{
  prices: Price[]
}> = ({ prices }) => {
  const price = prices[0]
  if (!price || !price.amount_float || !price.compare_at_amount_float)
    return <span />

  const percentage: number = Math.floor(
    (1 - price.amount_float / price.compare_at_amount_float) * 100
  )
  if (percentage <= 0) return <span />
  return <StyledBadge>-{percentage.toString()}%</StyledBadge>
}
