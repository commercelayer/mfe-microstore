import { FC } from "react"
import { useTranslation } from "react-i18next"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
  skuCode?: string
}

export const BuyNowButton: FC<Props> = ({ disabled, skuCode, quantity }) => {
  const { t } = useTranslation()
  return (
    <StyledAddToCartButton
      data-test-id="button-buy-now"
      buyNowMode
      skuCode={skuCode}
      quantity={`${quantity}`}
      label={t("buttons.buyNow")}
      disabled={disabled}
    />
  )
}
