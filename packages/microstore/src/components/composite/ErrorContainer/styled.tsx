import Styled from "styled-components"
import tw from "twin.macro"

import { Logo } from "#components/ui/Footer/cl"

export const Main = Styled.div`
  ${tw`flex flex-col flex-1 justify-center items-center text-center`}
`
export const Wrapper = Styled.div`
  ${tw`flex flex-wrap justify-end items-stretch flex-col h-screen p-5 md:p-10 lg:px-20 lg:pb-10`}
`
export const Text = Styled.p`
  ${tw`p-4 text-sm font-normal text-gray-500`}
`
export const Error = Styled.div`
  ${tw`flex flex-col items-center md:(flex-row)`}
`
export const ErrorCode = Styled.p`
  ${tw`p-4 text-xl font-bold border-gray-300 text-gray-800 border-b  md:(border-r border-b-0)`}
`
export const LogoWrapper = Styled.div`
  ${tw`md:max-w-xs`}
`
export const FullLogo = Styled(Logo)`
  ${tw`text-black`}
`
