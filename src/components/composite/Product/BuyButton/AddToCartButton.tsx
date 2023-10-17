import { FC } from "react"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
}

export const AddToCartButton: FC<Props> = ({ disabled, quantity }) => (
  <StyledAddToCartButton
    data-test-id="button-add-to-cart"
    label="Add to cart"
    quantity={`${quantity}`}
    redirectToHostedCart
    disabled={disabled}
  />
)
