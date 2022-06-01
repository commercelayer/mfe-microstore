import { AddToCartButton as AddToCartButtonComponent } from "@commercelayer/react-components"
import { useRouter } from "next/router"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import { ButtonCss } from "components/ui/Button"

export const AddToCardButton: FC = () => {
  const { query } = useRouter()
  const isCartEnabled = Boolean(query.cart)

  const [justAdded, setJustAdded] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  // temporarly disabling button to trigger some UI feedback
  useEffect(() => {
    if (justAdded) {
      timeoutId.current = setTimeout(() => {
        setJustAdded(false)
      }, 3000)
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [justAdded])

  return isCartEnabled ? (
    <div>
      <StyledAddToCartButton>
        {({ handleClick, ...rest }) => {
          return (
            <button
              {...rest}
              disabled={justAdded}
              onClick={() => {
                handleClick().then(({ success }) => {
                  setJustAdded(Boolean(success))
                })
              }}
            >
              Add to cart
            </button>
          )
        }}
      </StyledAddToCartButton>
      {justAdded && <StyledFeedback>Item added to cart!</StyledFeedback>}
    </div>
  ) : (
    <StyledAddToCartButton buyNowMode label="Buy Now" />
  )
}

const StyledAddToCartButton = styled(AddToCartButtonComponent)`
  ${ButtonCss}
`

const StyledFeedback = styled.div`
  ${tw`absolute text-sm font-medium text-primary`}
`
