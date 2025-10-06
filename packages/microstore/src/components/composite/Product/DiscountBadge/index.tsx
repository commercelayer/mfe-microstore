import type { Price } from "@commercelayer/sdk"
import type { FC } from "react"

export const DiscountBadge: FC<{
  prices: Price[]
}> = ({ prices }) => {
  const price = prices[0]
  if (!price || !price.amount_float || !price.compare_at_amount_float)
    return <span />

  const percentage: number = Math.floor(
    (1 - price.amount_float / price.compare_at_amount_float) * 100,
  )
  if (percentage <= 0) return <span />
  return (
    <div className="absolute p-1 text-xs left-0 top-2 bg-primary text-contrast">
      -{percentage.toString()}%
    </div>
  )
}
