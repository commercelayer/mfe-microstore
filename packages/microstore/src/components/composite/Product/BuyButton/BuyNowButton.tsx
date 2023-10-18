import { FC } from "react"
import { useTranslation } from "react-i18next"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
}

export const BuyNowButton: FC<Props> = ({ disabled, quantity }) => {
  const { t } = useTranslation()
  return (
    <StyledAddToCartButton
      data-test-id="button-buy-now"
      buyNowMode
      quantity={`${quantity}`}
      label={t("buttons.buyNow")}
      disabled={disabled}
    />
  )
}
