import { SkusContainer, Skus } from "@commercelayer/react-components"

import { Hero } from "components/composite/Hero"
import { Product } from "components/composite/Product"

import { Wrapper } from "./styled"

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
        <Wrapper>
          <SkusContainer skus={skus}>
            <Skus>
              <Product />
            </Skus>
          </SkusContainer>
        </Wrapper>
      }
    </>
  )
}
