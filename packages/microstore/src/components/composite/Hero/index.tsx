import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { I18N_PREFIX } from "#providers/i18n"
import type { SimpleSkuList } from "#providers/SkuListProvider"
import { DiscountBanner } from "../DiscountBanner"

interface Props {
  couponCode?: string
  skuList?: SimpleSkuList
}

export const Hero = ({ skuList, couponCode }: Props) => {
  const { lang } = useDataFromUrl()

  return (
    <div className="pt-8 px-8 lg:px-0">
      {skuList?.name && (
        <h1 className="font-bold text-xl mb-2">
          {skuList?.metadata?.[`${I18N_PREFIX}_${lang}_name`] ?? skuList.name}
        </h1>
      )}
      {skuList?.description && (
        <p className="text-sm mb-2">
          {skuList?.metadata?.[`${I18N_PREFIX}_${lang}_description`] ??
            skuList.description}
        </p>
      )}
      <DiscountBanner couponCode={couponCode} />
    </div>
  )
}
