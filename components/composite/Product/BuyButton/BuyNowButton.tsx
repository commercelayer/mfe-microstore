import { FC } from "react"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
}

export const BuyNowButton: FC<Props> = ({ disabled }) => {
  return (
    <StyledAddToCartButton
      data-test-id="button-buy-now"
      buyNowMode
      label="Buy Now"
      disabled={disabled}
    />
  )
}
