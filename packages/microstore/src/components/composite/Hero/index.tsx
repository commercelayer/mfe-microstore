import { DiscountBanner } from "../DiscountBanner"

import { Title, Description, Wrapper } from "./styled"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { I18N_PREFIX } from "#providers/i18n"
import { SimpleSkuList } from "#providers/SkuListProvider"
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
          {(skuList.metadata &&
            skuList.metadata[`${I18N_PREFIX}_${lang}_name`]) ??
            skuList.name}
        </Title>
      )}
      {skuList?.description && (
        <Description>
          {(skuList.metadata &&
            skuList.metadata[`${I18N_PREFIX}_${lang}_description`]) ??
            skuList.description}
        </Description>
      )}
      <DiscountBanner couponCode={couponCode} />
    </Wrapper>
  )
}
