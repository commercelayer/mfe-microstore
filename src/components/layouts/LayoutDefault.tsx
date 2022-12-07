import styled from "styled-components"
import tw from "twin.macro"

import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"

interface Props {
  main: React.ReactNode
}

export const LayoutDefault: React.FC<Props> = ({ main }) => {
  return (
    <Base>
      <Container>
        <Wrapper>
          <Main>{main}</Main>
        </Wrapper>
      </Container>
    </Base>
  )
}

const Wrapper = styled.div`
  ${tw`flex flex-wrap justify-end items-stretch flex-col min-h-full md:h-screen md:flex-row`}
`

const Main = styled.div`
  ${tw`flex-none md:flex-1 justify-center order-first md:order-last`}
`
