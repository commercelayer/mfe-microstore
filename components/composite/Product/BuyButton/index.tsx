import { FC } from "react"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"

import { AddInlineButton } from "./AddInlineButton"
import { AddToCartButton } from "./AddToCartButton"
import { BuyNowButton } from "./BuyNowButton"

type Experience = "addInline" | "addToCart" | "buyNow"

const ButtonExperiences: Record<Experience, JSX.Element> = {
  addInline: <AddInlineButton />,
  addToCart: <AddToCartButton />,
  buyNow: <BuyNowButton />,
}

export const BuyButton: FC = () => {
  const { cart, inline } = useDataFromUrl()
  const activeExperience =
    cart && inline ? "addInline" : cart ? "addToCart" : "buyNow"

  return <>{ButtonExperiences[activeExperience]}</>
}
