import { FC } from "react"

import { StyledAddToCartButton } from "./styled"

export const AddAndCheckout: FC = () => {
  return (
    <StyledAddToCartButton
      data-test-id="button-buy-now"
      buyNowMode
      label="Buy Now"
    />
  )
}
