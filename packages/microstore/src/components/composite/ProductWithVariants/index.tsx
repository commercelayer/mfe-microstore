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

import { SkuWithPrices } from "#providers/SkuListProvider"

export const ProductWithVariants: FC<{ skus: SkuWithPrices[] }> = ({
  skus,
}) => {
  const [sku, setSku] = useState(skus[0])

  const { t } = useTranslation()

  return (
    <>
      <Card>
        {sku.image_url && (
          <CardImage>
            <img
              className="h-48 rounded-md w-full object-scale-down self-start p-1 border border-gray-100 md:(h-36)"
              src={sku.image_url}
            />
            <DiscountBadge prices={sku.prices} />
          </CardImage>
        )}
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
            <AvailabilityContainer skuCode={sku.code}>
              <AvailabilityTemplate
                labels={{
                  available: t("availability.available"),
                  outOfStock: t("availability.outOfStock"),
                }}
              >
                {({ quantity, text }) => {
                  return (
                    <>
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
                            <VariantSelector
                              variants={skus}
                              sku={sku}
                              setSku={setSku}
                            />
                          )}
                          <QuantitySelector
                            skuCode={sku.code}
                            quantityAvailable={quantity}
                          />
                          <BuyButton
                            skuCode={sku.code}
                            available={quantity > 0}
                          />
                        </QuantityAndButtonWrapper>
                      </CardPrice>

                      <CardStock>
                        <span
                          className={`block w-2 h-2  ${
                            quantity > 0 ? "bg-green-400" : "bg-red-400"
                          } rounded-full`}
                        />
                        {text}
                      </CardStock>
                    </>
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
