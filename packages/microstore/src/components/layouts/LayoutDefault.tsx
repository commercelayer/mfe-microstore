import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"

interface Props {
  main: React.ReactNode
}

export const LayoutDefault: React.FC<Props> = ({ main }) => {
  return (
    <Base>
      <Container>
        <div className="flex flex-wrap justify-end items-stretch flex-col min-h-full md:h-screen md:flex-row">
          <div className="flex-none md:flex-1 justify-center order-first md:order-last">
            {main}
          </div>
        </div>
      </Container>
    </Base>
  )
}
