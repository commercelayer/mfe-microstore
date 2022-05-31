import { AddToCartButton as AddToCartButtonComponent } from "@commercelayer/react-components"
import { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import { ButtonCss } from "components/ui/Button"

export const AddToCardButton: FC = () => {
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

  return (
    <div>
      <AddToCartButtonComponent>
        {({ handleClick, ...rest }) => {
          return (
            <StyledAddToCartButton
              {...rest}
              disabled={justAdded}
              onClick={() => {
                handleClick().then(({ success }) => {
                  setJustAdded(Boolean(success))
                })
              }}
            >
              Add to cart
            </StyledAddToCartButton>
          )
        }}
      </AddToCartButtonComponent>
      {justAdded && <StyledFeedback>Item added to cart!</StyledFeedback>}
    </div>
  )
}

const StyledAddToCartButton = styled.button`
  ${ButtonCss}
`

const StyledFeedback = styled.div`
  ${tw`absolute text-sm font-medium text-primary`}
`
