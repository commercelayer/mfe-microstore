import { useOrderContainer } from "@commercelayer/react-components"
import { FC } from "react"

import { StyledAddToCartButton } from "./styled"
import { useAddToCartFeedback } from "./useAddToCartFeedback"

interface Props {
  disabled?: boolean
  quantity?: number
  skuCode: string
}

export const AddInlineButton: FC<Props> = ({ disabled, quantity, skuCode }) => {
  const { justAdded, handleOnAddFeedback } = useAddToCartFeedback()
  const { addToCart } = useOrderContainer()
  return (
    <StyledAddToCartButton>
      {({ handleClick, ...rest }) => {
        return (
          <button
            {...rest}
            data-test-id="button-add-to-cart-inline"
            disabled={disabled || justAdded}
            onClick={() =>
              handleOnAddFeedback(() =>
                addToCart({ skuCode: skuCode, quantity })
              )
            }
          >
            {justAdded ? "Added!" : "Add to cart"}
          </button>
        )
      }}
    </StyledAddToCartButton>
  )
}
