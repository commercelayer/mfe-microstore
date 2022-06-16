import { FC } from "react"

import { StyledAddToCartButton, StyledFeedback } from "./styled"
import { useAddToCartFeedback } from "./useAddToCartFeedback"

export const AddInlineButton: FC = () => {
  const { justAdded, handleOnAddFeedback } = useAddToCartFeedback()
  return (
    <div>
      <StyledAddToCartButton>
        {({ handleClick, ...rest }) => {
          return (
            <button
              {...rest}
              data-test-id="button-add-to-cart"
              disabled={justAdded}
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
