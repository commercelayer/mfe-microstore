import { FC } from "react"

import { AddInlineButton } from "./AddInlineButton"
import { AddToCartButton } from "./AddToCartButton"
import { BuyNowButton } from "./BuyNowButton"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { useBuyAll } from "#providers/BuyAllProvider"

type Experience = "addInline" | "addToCart" | "buyNow"

const ButtonExperiences: Record<
  Experience,
  (p: { disabled?: boolean; quantity: number; skuCode?: string }) => JSX.Element
> = {
  addInline: (p) => <AddInlineButton {...p} />,
  addToCart: (p) => <AddToCartButton {...p} />,
  buyNow: (p) => <BuyNowButton {...p} />,
}

export const BuyButton: FC<{ skuCode: string; available: boolean }> = ({
  skuCode,
  available,
}) => {
  const { cart, inline } = useDataFromUrl()
  const { isBuyingAll, skus } = useBuyAll()
  const sku = skus.find((sku) => sku.skuCode === skuCode)
  const activeExperience =
    cart && inline ? "addInline" : cart ? "addToCart" : "buyNow"

  return (
    <>
      {ButtonExperiences[activeExperience]({
        disabled: isBuyingAll || !available,
        quantity: sku?.quantity || 1,
        skuCode: sku?.skuCode,
      })}
    </>
  )
}
