import {
  AvailabilityTemplate,
  AvailabilityContainer,
} from "@commercelayer/react-components"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

import { BuyButton } from "../Product/BuyButton"
import { DiscountBadge } from "../Product/DiscountBadge"
import { QuantitySelector } from "../Product/QuantitySelector"
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
} from "../Product/styled"

import { LocalizedAttribute } from "./LocalizedAttribute"
import { VariantSelector } from "./VariantSelector"

export const WithVariants: FC<{ skus: any }> = ({ skus }) => {
  const [sku, setSku] = useState(skus[0])
  const { t } = useTranslation()

  return (
    <>
      <Card>
        <CardImage>
          <img
            className="h-48 rounded-md w-full object-scale-down self-start p-1 border border-gray-100 md:(h-36)"
            src={sku.image_url}
          />
          <DiscountBadge prices={sku.prices} />
        </CardImage>
        <CardBody>
          <CardTitle>
            <p>
              <LocalizedAttribute sku={sku} attribute="name" />
            </p>
          </CardTitle>
          <CardDesc>
            <p>
              <LocalizedAttribute sku={sku} attribute="description" />{" "}
            </p>
          </CardDesc>
          <CardFooter>
            <CardPrice>
              <CardPriceWrapper>
                <p className="text-xl font-bold">
                  {sku.prices[0].formatted_amount}
                </p>
                <p className="text-gray-400 line-through mr-2">
                  {sku.prices[0].formatted_compare_at_amount}
                </p>
              </CardPriceWrapper>
              <QuantityAndButtonWrapper>
                {skus.length > 1 && (
                  <VariantSelector variants={skus} setSku={setSku} />
                )}
                <QuantitySelector skuCode={sku.code} />
                <BuyButton skuCode={sku.code} />
              </QuantityAndButtonWrapper>
            </CardPrice>
            <AvailabilityContainer skuCode={sku.code}>
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
