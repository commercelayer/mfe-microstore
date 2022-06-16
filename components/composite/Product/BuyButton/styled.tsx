import { AddToCartButton as AddToCartButtonComponent } from "@commercelayer/react-components"
import styled from "styled-components"
import tw from "twin.macro"

import { ButtonCss } from "components/ui/Button"

export const StyledAddToCartButton = styled(AddToCartButtonComponent)`
  ${ButtonCss}
`

export const StyledFeedback = styled.div`
  ${tw`absolute text-sm font-medium text-primary`}
`
