import { SkusContainer, Skus } from "@commercelayer/react-components"

import { DiscountBanner } from "components/composite/DiscountBanner"
import { Product } from "components/composite/Product"

interface Props {
  skus?: string[]
  couponCode?: string
}

export const Microstore = ({ skus = [], couponCode }: Props) => {
  if (skus.length === 0) return null

  return (
    <>
      <DiscountBanner couponCode={couponCode} />
      {
        <div className="flex flex-wrap">
          <SkusContainer skus={skus}>
            <Skus>
              <Product />
            </Skus>
          </SkusContainer>
        </div>
      }
    </>
  )
}
