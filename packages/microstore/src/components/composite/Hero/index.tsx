import { DiscountBanner } from "../DiscountBanner"

import { Description, Title, Wrapper } from "./styled"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import type { SimpleSkuList } from "#providers/SkuListProvider"
import { I18N_PREFIX } from "#providers/i18n"
interface Props {
  couponCode?: string
  skuList?: SimpleSkuList
}

export const Hero = ({ skuList, couponCode }: Props) => {
  const { lang } = useDataFromUrl()

  return (
    <Wrapper>
      {skuList?.name && (
        <Title>
          {skuList?.metadata?.[`${I18N_PREFIX}_${lang}_name`] ?? skuList.name}
        </Title>
      )}
      {skuList?.description && (
        <Description>
          {skuList?.metadata?.[`${I18N_PREFIX}_${lang}_description`] ??
            skuList.description}
        </Description>
      )}
      <DiscountBanner couponCode={couponCode} />
    </Wrapper>
  )
}
