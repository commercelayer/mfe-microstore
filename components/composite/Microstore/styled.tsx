import styled from "styled-components"
import tw from "twin.macro"

export const Wrapper = styled.div`
  ${tw`flex flex-col`}

  & hr:last-child {
    ${tw`hidden`}
  }
`
