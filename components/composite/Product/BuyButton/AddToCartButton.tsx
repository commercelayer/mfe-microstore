import { FC } from "react"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
}

export const AddToCartButton: FC<Props> = ({ disabled }) => (
  <StyledAddToCartButton
    data-test-id="button-add-to-cart"
    label="Add to cart"
    redirectToHostedCart
    disabled={disabled}
  />
)
