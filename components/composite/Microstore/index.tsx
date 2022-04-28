import { SkusContainer, Skus } from "@commercelayer/react-components"

import { Hero } from "components/composite/Hero"
import { Product } from "components/composite/Product"

interface Props {
  skus?: string[]
  couponCode?: string
}

export const Microstore = ({ skus = [], couponCode }: Props) => {
  if (skus.length === 0) return null

  return (
    <>
      <Hero couponCode={couponCode} />
      {
        <SkusContainer skus={skus}>
          <Skus>
            <Product />
          </Skus>
        </SkusContainer>
      }
    </>
  )
}
