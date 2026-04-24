import { type ChangeEvent, type FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Label } from "#components/ui/Label"
import { Select } from "#components/ui/Select"
import type { SkuWithPrices } from "#providers/SkuListProvider"
import { LocalizedAttribute } from "../LocalizedAttribute"

interface Props {
  variants: SkuWithPrices[]
  sku: SkuWithPrices
  setSku: (sku: SkuWithPrices) => void
}

export const VariantSelector: FC<Props> = ({ variants, sku, setSku }) => {
  const { t } = useTranslation()
  const options = variants.map((variant) => [variant.id, variant.name])
  const [value, setValue] = useState(sku.code)
  const onSkuChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const sku = variants.find((v) => v.code === e.target.value)
    if (sku) {
      setSku(sku)
      setValue(e.target.value)
    }
  }

  return options.length > 0 ? (
    <div>
      <Label>{t("labels.variant")}</Label>
      <Select
        value={value}
        onChange={onSkuChangeHandler}
        data-test-id="variant-selector"
      >
        {variants.map((i) => (
          <option key={i.code} value={i.code}>
            {<LocalizedAttribute sku={i} attribute="name" type="variant" />}
          </option>
        ))}
      </Select>
    </div>
  ) : null
}
