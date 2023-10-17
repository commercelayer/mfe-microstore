import { FC } from "react"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
}

export const BuyNowButton: FC<Props> = ({ disabled, quantity }) => {
  return (
    <StyledAddToCartButton
      data-test-id="button-buy-now"
      buyNowMode
      quantity={`${quantity}`}
      label="Buy Now"
      disabled={disabled}
    />
  )
}
