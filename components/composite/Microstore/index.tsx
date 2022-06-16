import {
  SkusContainer,
  Skus,
  ItemContainer,
  PricesContainer,
  AvailabilityContainer,
} from "@commercelayer/react-components"

import { Hero } from "components/composite/Hero"
import { Product } from "components/composite/Product"
import { useBuyAll } from "components/data/BuyAllProvider"
import { Button } from "components/ui/Button"

import { Wrapper } from "./styled"

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
  const { isBuyingAll, showBuyAllButton, buyAll } = useBuyAll()
  const onBuyAllClick = async () => {
    const order = await buyAll()
    if (order?.cart_url) {
      // window.location.href = order.cart_url
    }
  }

  if (skus.length === 0)
    return (
      <div className="py-10 font-bold" data-test-id="no-skus-found">
        We could not find any products to display. Please check your URL and try
        again.
      </div>
    )

  return (
    <>
      <Hero title={title} description={description} couponCode={couponCode} />
      {showBuyAllButton && (
        <Button disabled={isBuyingAll} onClick={onBuyAllClick}>
          Buy all
        </Button>
      )}

      {
        <Wrapper>
          <SkusContainer skus={skus.map(({ skuCode }) => skuCode)}>
            <ItemContainer>
              <PricesContainer>
                <AvailabilityContainer>
                  <Skus>
                    <Product />
                  </Skus>
                </AvailabilityContainer>
              </PricesContainer>
            </ItemContainer>
          </SkusContainer>
        </Wrapper>
      }
    </>
  )
}
