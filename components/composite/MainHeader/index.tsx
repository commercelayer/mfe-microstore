import styled from "styled-components"
import tw from "twin.macro"

export const MainHeader: React.FC = () => {
  return (
    <Wrapper>
      <Recap>
        <Title>Just for you</Title>
      </Recap>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${tw`flex flex-row border-t mb-5 px-5 pt-5 -mx-5 md:px-0 md:-mx-0 md:mb-0 md:border-t-0 md:border-b md:pt-0 justify-between md:items-center pb-2`}
`
const Title = styled.h1`
  ${tw`text-black font-bold text-xl md:text-3xl ml-4`}
`
const Recap = styled.div`
  ${tw`flex flex-col flex-1 justify-between md:items-center md:flex-row`}
`
