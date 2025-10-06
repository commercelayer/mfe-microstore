import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"
import { Footer } from "#components/ui/Footer"
import { Logo } from "#components/ui/Footer/cl"

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
        <div className="flex flex-wrap justify-end items-stretch flex-col h-screen p-5 md:p-10 lg:px-20 lg:pb-10">
          <div className="md:max-w-xs">
            <Logo className="self-center text-black md:pl-4 md:self-auto" />
          </div>
          <div className="flex flex-col flex-1 justify-center items-center text-center">
            <div className="flex flex-col items-center md:flex-row">
              <p className="p-4 text-xl font-bold border-gray-300 text-gray-800 border-b md:border-r md:border-b-0">
                {errorCode}
              </p>
              <p
                className="p-4 text-sm font-normal text-gray-500"
                data-test-id="invalid-checkout"
              >
                {errorMessage}
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </Container>
    </Base>
  )
}
