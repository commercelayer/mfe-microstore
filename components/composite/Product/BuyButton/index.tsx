import { FC } from "react"

import { useBuyAll } from "components/data/BuyAllProvider"
import { useDataFromUrl } from "components/hooks/useDataFromUrl"

import { AddInlineButton } from "./AddInlineButton"
import { AddToCartButton } from "./AddToCartButton"
import { BuyNowButton } from "./BuyNowButton"

type Experience = "addInline" | "addToCart" | "buyNow"

const ButtonExperiences: Record<
  Experience,
  (p: { disabled?: boolean }) => JSX.Element
> = {
  addInline: (p) => <AddInlineButton {...p} />,
  addToCart: (p) => <AddToCartButton {...p} />,
  buyNow: (p) => <BuyNowButton {...p} />,
}

export const BuyButton: FC = () => {
  const { cart, inline } = useDataFromUrl()
  const { isBuyingAll } = useBuyAll()

  const activeExperience =
    cart && inline ? "addInline" : cart ? "addToCart" : "buyNow"

  return <>{ButtonExperiences[activeExperience]({ disabled: isBuyingAll })}</>
}
