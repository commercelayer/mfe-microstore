import styled from "styled-components"
import tw from "twin.macro"

import { Logo } from "./cl"

export const Footer: React.FC = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        Powered by <Logo width="135" height="22" className="pl-2" />
      </LogoWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${tw`md:flex w-full bottom-0 justify-start items-center border-t p-8 text-xs text-gray-400 lg:(p-0 py-8 mt-4)`}
`
const LogoWrapper = styled.div`
  ${tw`flex items-center`}
`
