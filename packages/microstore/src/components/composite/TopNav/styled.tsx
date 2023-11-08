import { CartLink } from "@commercelayer/react-components/orders/CartLink"
import Styled from "styled-components"
import tw from "twin.macro"

export const Nav = Styled.div`
  ${tw`flex justify-between items-center`}
`

export const CartLinkStyled = Styled(CartLink)`
  ${tw`block relative`}
`

export const Badge = Styled.div`
  ${tw`absolute px-2 py-1 leading-none rounded-full text-[10px] bg-primary text-contrast`}
  bottom: -4px;
  right: -6px;
`
