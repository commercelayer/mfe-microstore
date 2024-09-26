import { AvailabilityContainer } from "@commercelayer/react-components/skus/AvailabilityContainer"
import { AvailabilityTemplate } from "@commercelayer/react-components/skus/AvailabilityTemplate"
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

export const Product: FC<{ skus: SkuWithQuantity[] }> = ({ skus }) => {
  const [sku, setSku] = useState(skus[0].sku)
  const { t } = useTranslation()
  const { lang } = useDataFromUrl()
  const hasPrice = sku!.prices && sku!.prices.length > 0
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
          {sku.prices && <DiscountBadge prices={sku.prices} />}
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
          {hasPrice ? (
            <CardFooter>
              <AvailabilityContainer skuId={sku.id} skuCode={sku.code}>
                <AvailabilityTemplate
                  labels={{
                    available: t("availability.available"),
                    outOfStock: t("availability.outOfStock"),
                  }}
                >
                  {({ quantity, text }) => {
                    const isAvailable = !!(quantity > 0 || sku.do_not_track)
                    return (
                      <>
                        <CardPrice>
                          {sku.prices && (
                            <CardPriceWrapper>
                              <p className="text-xl font-bold">
                                {sku!.prices[0].formatted_amount}
                              </p>
                              {sku.prices[0].compare_at_amount_float != null &&
                                sku.prices[0].amount_float != null &&
                                sku.prices[0].amount_float <
                                  sku.prices[0].compare_at_amount_float && (
                                  <p className="text-gray-400 line-through mr-2">
                                    {sku.prices[0].formatted_compare_at_amount}
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
                              available={isAvailable}
                            />
                          </QuantityAndButtonWrapper>
                        </CardPrice>

                        <CardStock>
                          <span
                            className={`block w-2 h-2  ${
                              isAvailable ? "bg-green-400" : "bg-red-400"
                            } rounded-full`}
                          />
                          {text || t("availability.available")}
                        </CardStock>
                      </>
                    )
                  }}
                </AvailabilityTemplate>
              </AvailabilityContainer>
            </CardFooter>
          ) : (
            <p className="text-gray-400 mt-2">Price unavailable</p>
          )}
        </CardBody>
      </Card>
      <CardDivider />
    </>
  )
}
