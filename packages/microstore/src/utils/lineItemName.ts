import { I18N_PREFIX, FALLBACK_LANGUAGE } from "#providers/i18n"
import { SkuWithPrices } from "#providers/SkuListProvider"

export const lineItemName = (sku: SkuWithPrices, lang?: string) => {
  const metadata = sku.metadata
  if (metadata === null || metadata === undefined) return sku.name

  const localizedProductName: string | undefined =
    metadata[`${I18N_PREFIX}_${lang}_reference_name`] ||
    metadata[`${I18N_PREFIX}_${FALLBACK_LANGUAGE}_reference_name`]
  const localizedVariantName: string | undefined =
    metadata[`${I18N_PREFIX}_${lang}_name`] ||
    metadata[`${I18N_PREFIX}_${FALLBACK_LANGUAGE}_name`]
  if (
    localizedProductName !== undefined ||
    localizedVariantName !== undefined
  ) {
    return [localizedProductName, localizedVariantName]
      .filter((item) => item)
      .join(" - ")
  }

  return sku.name
}
