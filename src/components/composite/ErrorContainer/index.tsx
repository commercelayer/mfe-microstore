import {
  Wrapper,
  LogoWrapper,
  FullLogo,
  Main,
  Error,
  ErrorCode,
  Text,
} from "./styled"

import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"
import { Footer } from "#components/ui/Footer"

interface Props {
  errorCode: string | number
  errorMessage: string
}

export const ErrorContainer: React.FC<Props> = ({
  errorCode,
  errorMessage,
}) => {
  return (
    <Base>
      <Container>
        <Wrapper>
          <LogoWrapper>
            <FullLogo className="self-center text-black md:pl-4 md:self-auto" />
          </LogoWrapper>
          <Main>
            <Error>
              <ErrorCode>{errorCode}</ErrorCode>
              <Text data-test-id="invalid-checkout">{errorMessage}</Text>
            </Error>
          </Main>
          <Footer />
        </Wrapper>
      </Container>
    </Base>
  )
}
