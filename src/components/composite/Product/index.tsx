import {
  SkuField,
  Price,
  AvailabilityTemplate,
  AvailabilityContainer,
} from "@commercelayer/react-components"
import { FC } from "react"

import { BuyButton } from "./BuyButton"
import { DiscountBadge } from "./DiscountBadge"
import { QuantitySelector } from "./QuantitySelector"
import {
  Card,
  CardBody,
  CardDesc,
  CardDivider,
  CardFooter,
  CardImage,
  CardPrice,
  CardPriceWrapper,
  CardStock,
  CardTitle,
  QuantityAndButtonWrapper,
  Thumb,
} from "./styled"

export const Product: FC = () => {
  return (
    <>
      <Card>
        <CardImage>
          <Thumb attribute="image_url" tagElement="img" />
          <DiscountBadge />
        </CardImage>
        <CardBody>
          <CardTitle>
            <SkuField attribute="name" tagElement="p" />
          </CardTitle>
          <CardDesc>
            <SkuField attribute="description" tagElement="p" />
          </CardDesc>
          <CardFooter>
            <CardPrice>
              <CardPriceWrapper>
                <Price
                  className="text-xl font-bold"
                  compareClassName="text-gray-400 line-through mr-2"
                />
              </CardPriceWrapper>
              <QuantityAndButtonWrapper>
                <SkuField attribute="code" tagElement="span">
                  {({ attributeValue: skuCode }) => (
                    <>
                      <QuantitySelector skuCode={skuCode} />
                      <BuyButton skuCode={skuCode} />
                    </>
                  )}
                </SkuField>
              </QuantityAndButtonWrapper>
            </CardPrice>
            <AvailabilityContainer>
              <AvailabilityTemplate>
                {({ quantity, text }) => {
                  return (
                    <CardStock>
                      <span
                        className={`block w-2 h-2  ${
                          quantity === 0 ? "bg-red-400" : "bg-green-400"
                        } rounded-full`}
                      />
                      {text}
                    </CardStock>
                  )
                }}
              </AvailabilityTemplate>
            </AvailabilityContainer>
          </CardFooter>
        </CardBody>
      </Card>
      <CardDivider />
    </>
  )
}
