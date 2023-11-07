import { FC } from "react"
import { useTranslation } from "react-i18next"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
  skuCode?: string
  name: string
}

export const BuyNowButton: FC<Props> = ({
  disabled,
  skuCode,
  quantity,
  name,
}) => {
  const { t } = useTranslation()
  return (
    <StyledAddToCartButton
      data-test-id="button-buy-now"
      buyNowMode
      skuCode={skuCode}
      quantity={`${quantity}`}
      lineItem={{ name }}
      label={t("buttons.buyNow")}
      disabled={disabled}
    />
  )
}
