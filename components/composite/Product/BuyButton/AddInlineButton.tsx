import { FC } from "react"

import { StyledAddToCartButton, StyledFeedback } from "./styled"
import { useAddToCartFeedback } from "./useAddToCartFeedback"

interface Props {
  disabled?: boolean
}

export const AddInlineButton: FC<Props> = ({ disabled }) => {
  const { justAdded, handleOnAddFeedback } = useAddToCartFeedback()
  return (
    <div>
      <StyledAddToCartButton>
        {({ handleClick, ...rest }) => {
          return (
            <button
              {...rest}
              data-test-id="button-add-to-cart"
              disabled={disabled || justAdded}
              onClick={() => handleOnAddFeedback(handleClick)}
            >
              Add to cart
            </button>
          )
        }}
      </StyledAddToCartButton>
      {justAdded && <StyledFeedback>Item added to cart!</StyledFeedback>}
    </div>
  )
}
