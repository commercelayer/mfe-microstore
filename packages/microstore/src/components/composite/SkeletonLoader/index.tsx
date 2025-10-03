import type { FC, ReactNode } from "react"
import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"
import { Header } from "#components/ui/Header"

// Reusable skeleton components
export const SkeletonAnimate: FC<{
  children: ReactNode
  className?: string
}> = ({ children, className = "" }) => (
  <div className={`animate-pulse ${className}`}>{children}</div>
)

export const SkeletonBox: FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded-xl ${className}`} />
)

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
        <div className="pt-8 px-8 lg:px-0">
          <SkeletonAnimate>
            <SkeletonBox className="w-48 h-6" />
            <SkeletonBox className="w-full h-4 mt-2 md:w-1/2" />
          </SkeletonAnimate>
        </div>
        <div className="shadow-subtle flex flex-col gap-6 p-8 bg-white relative my-8 md:p-6 md:flex-row md:rounded-lg">
          <SkeletonAnimate>
            <SkeletonBox className="w-full h-36 md:w-40" />
          </SkeletonAnimate>
          <div className="flex-1">
            <SkeletonAnimate>
              <SkeletonBox className="w-3/5 h-8" />
              <SkeletonBox className="w-full h-4 mt-4" />
              <SkeletonBox className="w-full h-4 mt-2" />
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
        </div>
      </Container>
    </Base>
  )
}

export default SkeletonLoader
