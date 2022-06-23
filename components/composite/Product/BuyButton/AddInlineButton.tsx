import { FC } from "react"

import { StyledAddToCartButton } from "./styled"
import { useAddToCartFeedback } from "./useAddToCartFeedback"

interface Props {
  disabled?: boolean
}

export const AddInlineButton: FC<Props> = ({ disabled }) => {
  const { justAdded, handleOnAddFeedback } = useAddToCartFeedback()
  return (
    <StyledAddToCartButton>
      {({ handleClick, ...rest }) => {
        return (
          <button
            {...rest}
            data-test-id="button-add-to-cart-inline"
            disabled={disabled || justAdded}
            onClick={() => handleOnAddFeedback(handleClick)}
          >
            {justAdded ? "Added!" : "Add to cart"}
          </button>
        )
      }}
    </StyledAddToCartButton>
  )
}
