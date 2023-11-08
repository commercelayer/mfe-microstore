import { useOrderContainer } from "@commercelayer/react-components/hooks/useOrderContainer"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { StyledAddToCartButton } from "./styled"
import { useAddToCartFeedback } from "./useAddToCartFeedback"

interface Props {
  disabled?: boolean
  quantity?: number
  skuCode?: string
  name: string
}

export const AddInlineButton: FC<Props> = ({
  disabled,
  quantity,
  skuCode,
  name,
}) => {
  const { justAdded, handleOnAddFeedback } = useAddToCartFeedback()
  const { t } = useTranslation()
  const { addToCart } = useOrderContainer()
  return (
    <StyledAddToCartButton>
      {({ ...rest }) => {
        return (
          <button
            {...rest}
            data-test-id="button-add-to-cart-inline"
            disabled={disabled || justAdded}
            onClick={() =>
              handleOnAddFeedback(() =>
                addToCart({ skuCode, quantity, lineItem: { name } })
              )
            }
          >
            {justAdded ? t("buttons.inlineAdded") : t("buttons.addToCart")}
          </button>
        )
      }}
    </StyledAddToCartButton>
  )
}
