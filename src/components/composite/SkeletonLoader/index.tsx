import { Card } from "../Product/styled"

import { SkeletonAnimate, SkeletonBox, SkeletonHero } from "./styled"

import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"
import { Header } from "#components/ui/Header"

export const SkeletonLoader: React.FC = () => {
  return (
    <Base>
      <Header>
        <Container>
          <SkeletonAnimate>
            <SkeletonBox className="w-48 h-10" />
          </SkeletonAnimate>
        </Container>
      </Header>
      <Container>
        <SkeletonHero>
          <SkeletonAnimate>
            <SkeletonBox className="w-48 h-6" />
            <SkeletonBox className="w-full h-4 mt-2 md:w-1/2" />
          </SkeletonAnimate>
        </SkeletonHero>
        <Card>
          <SkeletonAnimate>
            <SkeletonBox className="w-full h-36 md:w-40" />
          </SkeletonAnimate>
          <div className="flex-1">
            <SkeletonAnimate>
              <SkeletonBox className="w-3/5 h-8" />
              <SkeletonBox className="w-full h-4 mt-4" />
              <SkeletonBox className="w-full h-4 mt-2" />
              <SkeletonBox className="w-full h-4 mt-2" />
            </SkeletonAnimate>
            <div className="flex flex-col my-8 gap-y-2 md:flex-row md:justify-between md:items-center">
              <SkeletonAnimate>
                <SkeletonBox className="w-24 h-8" />
              </SkeletonAnimate>
              <SkeletonAnimate>
                <SkeletonBox className="w-48 h-10" />
              </SkeletonAnimate>
            </div>
            <SkeletonAnimate>
              <SkeletonBox className="w-1/2 h-2" />
            </SkeletonAnimate>
          </div>
        </Card>
      </Container>
    </Base>
  )
}

export default SkeletonLoader
