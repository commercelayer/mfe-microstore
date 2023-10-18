import Styled from "styled-components"
import tw from "twin.macro"

export const Wrapper = Styled.div`
  ${tw`flex flex-col`}

  & hr:last-child {
    ${tw`hidden`}
  }
`
