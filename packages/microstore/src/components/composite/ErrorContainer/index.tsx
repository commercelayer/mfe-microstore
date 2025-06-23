import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"
import { Footer } from "#components/ui/Footer"
import {
  ErrorCode,
  ErrorDiv,
  FullLogo,
  LogoWrapper,
  Main,
  Text,
  Wrapper,
} from "./styled"

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
            <ErrorDiv>
              <ErrorCode>{errorCode}</ErrorCode>
              <Text data-test-id="invalid-checkout">{errorMessage}</Text>
            </ErrorDiv>
          </Main>
          <Footer />
        </Wrapper>
      </Container>
    </Base>
  )
}
