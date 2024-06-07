import { AvailabilityContainer } from "@commercelayer/react-components/skus/AvailabilityContainer"
import { AvailabilityTemplate } from "@commercelayer/react-components/skus/AvailabilityTemplate"
import { Price } from "@commercelayer/sdk"
import { FC, useState } from "react"
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
} from "./styled"
import { VariantSelector } from "./VariantSelector"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { lineItemName } from "#utils/lineItemName"
import { SkuWithQuantity } from "@typings/urlData"

export const Product: FC<{ skus: SkuWithQuantity[]; prices?: Price[] }> = ({
  skus,
  prices,
}) => {
  const [sku, setSku] = useState(skus[0].sku)
  const { t } = useTranslation()
  const { lang } = useDataFromUrl()
  const skuPrices = prices?.filter((price) => price.sku_code === sku.code)

  return (
    <>
      <Card>
        <CardImage>
          <img
            className="h-48 rounded-md w-full object-scale-down self-start p-1 border border-gray-100 md:(h-36)"
            src={
              sku.image_url ||
              "https://data.commercelayer.app/assets/images/placeholders/img_placeholder.svg"
            }
          />
          {skuPrices && <DiscountBadge prices={skuPrices} />}
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
            <AvailabilityContainer skuId={sku.id} skuCode={sku.code}>
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
                        {skuPrices && (
                          <CardPriceWrapper>
                            <p className="text-xl font-bold">
                              {skuPrices[0].formatted_amount}
                            </p>
                            {skuPrices[0].compare_at_amount_float != null &&
                              skuPrices[0].amount_float != null &&
                              skuPrices[0].amount_float <
                                skuPrices[0].compare_at_amount_float && (
                                <p className="text-gray-400 line-through mr-2">
                                  {skuPrices[0].formatted_compare_at_amount}
                                </p>
                              )}
                          </CardPriceWrapper>
                        )}
                        <QuantityAndButtonWrapper>
                          {skus.length > 1 && (
                            <VariantSelector
                              variants={skus.map((s) => s.sku)}
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
                            name={lineItemName(sku, lang)}
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
