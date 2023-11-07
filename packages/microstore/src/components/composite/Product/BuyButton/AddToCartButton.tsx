import { FC } from "react"
import { useTranslation } from "react-i18next"

import { StyledAddToCartButton } from "./styled"

interface Props {
  disabled?: boolean
  quantity: number
  skuCode?: string
  name: string
}

export const AddToCartButton: FC<Props> = ({
  disabled,
  skuCode,
  quantity,
  name,
}) => {
  const { t } = useTranslation()
  return (
    <StyledAddToCartButton
      data-test-id="button-add-to-cart"
      label={t("buttons.addToCart")}
      quantity={`${quantity}`}
      redirectToHostedCart
      skuCode={skuCode}
      lineItem={{ name }}
      disabled={disabled}
    />
  )
}
