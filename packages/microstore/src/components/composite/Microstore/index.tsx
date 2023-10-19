import {
  SkusContainer,
  Skus,
  PricesContainer,
  AvailabilityContainer,
} from "@commercelayer/react-components"

import { ButtonBuyAll } from "../ButtonBuyAll"

import { Wrapper } from "./styled"

import { Hero } from "#components/composite/Hero"
import { Product } from "#components/composite/Product"

interface Props {
  skus?: SkuWithQuantity[]
  title?: string
  description?: string
  couponCode?: string
}

export const Microstore = ({
  skus = [],
  title,
  description,
  couponCode,
}: Props) => {
  if (skus.length === 0) {
    return (
      <div className="py-10 font-bold" data-test-id="no-skus-found">
        We could not find any products to display. Please check your URL and try
        again.
      </div>
    )
  }

  return (
    <>
      <Hero title={title} description={description} couponCode={couponCode} />
      <ButtonBuyAll />

      <Wrapper>
        <SkusContainer skus={skus.map(({ skuCode }) => skuCode)}>
          <PricesContainer>
            <AvailabilityContainer>
              <Skus>
                <Product />
              </Skus>
            </AvailabilityContainer>
          </PricesContainer>
        </SkusContainer>
      </Wrapper>
    </>
  )
}
