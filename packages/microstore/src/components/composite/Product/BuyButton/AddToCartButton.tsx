import { FC } from "react"
import { useTranslation } from "react-i18next"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
}

export const AddToCartButton: FC<Props> = ({ disabled, quantity }) => {
  const { t } = useTranslation()
  return (
    <StyledAddToCartButton
      data-test-id="button-add-to-cart"
      label={t("buttons.addToCart")}
      quantity={`${quantity}`}
      redirectToHostedCart
      disabled={disabled}
    />
  )
}
