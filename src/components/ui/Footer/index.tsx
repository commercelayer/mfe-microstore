import Styled from "styled-components"
import tw from "twin.macro"

import { Logo } from "./cl"

export function Footer(): JSX.Element {
  return (
    <Wrapper>
      <a target="_blank" href="https://commercelayer.io/" rel="noreferrer">
        <LogoWrapper>
          Powered by <Logo width="135" height="22" className="pl-2" />
        </LogoWrapper>
      </a>
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  ${tw`md:flex w-full bottom-0 justify-start items-center border-t p-8 text-xs text-gray-400 lg:(p-0 py-8 mt-4)`}
`
const LogoWrapper = Styled.div`
  ${tw`flex items-center`}
`
