import { FC } from "react"

import { AddInlineButton } from "./AddInlineButton"
import { AddToCartButton } from "./AddToCartButton"
import { BuyNowButton } from "./BuyNowButton"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { useBuyAll } from "#providers/BuyAllProvider"

type Experience = "addInline" | "addToCart" | "buyNow"

const ButtonExperiences: Record<
  Experience,
  (p: {
    disabled?: boolean
    name: string
    quantity: number
    skuCode?: string
  }) => JSX.Element
> = {
  addInline: (p) => <AddInlineButton {...p} />,
  addToCart: (p) => <AddToCartButton {...p} />,
  buyNow: (p) => <BuyNowButton {...p} />,
}

export const BuyButton: FC<{
  skuCode: string
  name: string
  available: boolean
}> = ({ skuCode, name, available }) => {
  const { cart, inline } = useDataFromUrl()
  const { isBuyingAll, skus } = useBuyAll()
  const item = skus.find((item) => item.sku.code === skuCode)
  const activeExperience =
    cart && inline ? "addInline" : cart ? "addToCart" : "buyNow"

  return (
    <>
      {ButtonExperiences[activeExperience]({
        disabled: isBuyingAll || !available,
        name,
        quantity: item?.quantity || 1,
        skuCode: item?.sku.code,
      })}
    </>
  )
}
