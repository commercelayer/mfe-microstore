import { DiscountBanner } from "../DiscountBanner"

import { Title, Description, Wrapper } from "./styled"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { I18N_PREFIX } from "#providers/i18n"
interface Props {
  couponCode?: string
  skuList?: SkuListRenamed
}

export const Hero = ({ skuList, couponCode }: Props) => {
  const { lang } = useDataFromUrl()

  return (
    <Wrapper>
      {skuList?.title && (
        <Title>
          {(skuList.metadata &&
            skuList.metadata[`${I18N_PREFIX}_${lang}_title`]) ??
            skuList.title}
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
