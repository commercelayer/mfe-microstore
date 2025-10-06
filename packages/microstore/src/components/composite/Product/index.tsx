import { AvailabilityContainer } from "@commercelayer/react-components/skus/AvailabilityContainer"
import { AvailabilityTemplate } from "@commercelayer/react-components/skus/AvailabilityTemplate"
import type { SkuWithQuantity } from "@typings/urlData"
import { type FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { lineItemName } from "#utils/lineItemName"
import { BuyButton } from "./BuyButton"
import { DiscountBadge } from "./DiscountBadge"
import { LocalizedAttribute } from "./LocalizedAttribute"
import { QuantitySelector } from "./QuantitySelector"
import { VariantSelector } from "./VariantSelector"

export const Product: FC<{ skus: SkuWithQuantity[] }> = ({ skus }) => {
  const [sku, setSku] = useState(skus[0].sku)
  const { t } = useTranslation()
  const { lang } = useDataFromUrl()
  const hasPrice = sku?.prices && sku?.prices.length > 0
  return (
    <>
      <div className="shadow-subtle flex flex-col gap-6 p-8 bg-white relative my-8 md:p-6 md:flex-row md:rounded-lg">
        <figure className="relative w-full md:w-32 h-48">
          <img
            alt="Default product"
            className="h-full rounded-md w-full object-scale-down self-start p-1 border border-gray-100"
            src={
              sku.image_url ||
              "https://data.commercelayer.app/assets/images/placeholders/img_placeholder.svg"
            }
          />
          {sku.prices && <DiscountBadge prices={sku.prices} />}
        </figure>
        <div className="relative flex-1">
          <h3 className="text-2xl">
            <p>
              <LocalizedAttribute sku={sku} attribute="name" />
            </p>
          </h3>
          <div className="text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
            <p>
              <LocalizedAttribute sku={sku} attribute="description" />{" "}
            </p>
          </div>
          {hasPrice ? (
            <div className="flex flex-col mt-6">
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
                        <div className="flex flex-col gap-y-4 md:flex-row md:justify-between">
                          {sku.prices && (
                            <div className="flex flex-row-reverse items-center self-start md:self-center">
                              <p className="text-xl font-bold">
                                {sku?.prices[0].formatted_amount}
                              </p>
                              {sku.prices[0].compare_at_amount_float != null &&
                                sku.prices[0].amount_float != null &&
                                sku.prices[0].amount_float <
                                  sku.prices[0].compare_at_amount_float && (
                                  <p className="text-gray-400 line-through mr-2">
                                    {sku.prices[0].formatted_compare_at_amount}
                                  </p>
                                )}
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
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
                          </div>
                        </div>

                        <div className="flex text-gray-400 items-center gap-2 text-xs mt-4">
                          <span
                            className={`block w-2 h-2  ${
                              isAvailable ? "bg-green-400" : "bg-red-400"
                            } rounded-full`}
                          />
                          {text || t("availability.available")}
                        </div>
                      </>
                    )
                  }}
                </AvailabilityTemplate>
              </AvailabilityContainer>
            </div>
          ) : (
            <p className="text-gray-400 mt-2">Price unavailable</p>
          )}
        </div>
      </div>
      <hr className="block border-dashed border-gray-200" />
    </>
  )
}
