import { FC } from "react"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"

import { AddAndCart } from "./AddAndCart"
import { AddAndCheckout } from "./AddAndCheckout"
import { AddAndStay } from "./AddAndStay"

type Experience = "addAndStay" | "addAndCart" | "addAndCheckout"

const ButtonExperiences: Record<Experience, JSX.Element> = {
  addAndStay: <AddAndStay />,
  addAndCart: <AddAndCart />,
  addAndCheckout: <AddAndCheckout />,
}

export const AddToCartButton: FC = () => {
  const { cart, inline } = useDataFromUrl()
  const activeExperience =
    cart && inline ? "addAndStay" : cart ? "addAndCart" : "addAndCheckout"

  return <>{ButtonExperiences[activeExperience]}</>
}
