import {
  SkuField,
  Price,
  AvailabilityTemplate,
  AvailabilityContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { BuyButton } from "./BuyButton"
import { DiscountBadge } from "./DiscountBadge"
import { LocalizedAttribute } from "./LocalizedAttribute"
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
  const { t } = useTranslation()
  return (
    <>
      <Card>
        <CardImage>
          <Thumb attribute="image_url" tagElement="img" />
          <DiscountBadge />
        </CardImage>
        <CardBody>
          <CardTitle>
            <LocalizedAttribute attribute="name" />
          </CardTitle>
          <CardDesc>
            <LocalizedAttribute attribute="description" />
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
                  {/* @ts-expect-error typing should come from react-components */}
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
              <AvailabilityTemplate
                labels={{
                  available: t("availability.available"),
                  outOfStock: t("availability.outOfStock"),
                }}
              >
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
