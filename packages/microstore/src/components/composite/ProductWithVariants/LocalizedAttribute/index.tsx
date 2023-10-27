import { FC } from "react"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { I18N_PREFIX } from "#providers/i18n"
import { SkuWithPrices } from "#providers/SkuListProvider"

type LocalizedAttributeProp = "name" | "description"

export const LocalizedAttribute: FC<{
  sku: SkuWithPrices
  type?: "variant" | "product"
  attribute: LocalizedAttributeProp
}> = ({ sku, attribute, type = "product" }) => {
  const { lang } = useDataFromUrl()
  const metadata = sku.metadata

  const value =
    metadata &&
    (type === "product"
      ? metadata[`${I18N_PREFIX}_${lang}_reference_${attribute}`] ??
        metadata[`${I18N_PREFIX}_${lang}_${attribute}`]
      : metadata[`${I18N_PREFIX}_${lang}_${attribute}`])
  return value || sku[attribute]
}
