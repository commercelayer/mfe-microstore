import { useRouter } from "next/router"
import { FC } from "react"

import { ParsedUrlQuery } from "querystring"

import { AddAndCart } from "./AddAndCart"
import { AddAndCheckout } from "./AddAndCheckout"
import { AddAndStay } from "./AddAndStay"

type Experience = "addAndStay" | "addAndCart" | "addAndCheckout"

const getExperience = (query: ParsedUrlQuery): Experience => {
  const isCartEnabled = query.cart === "true"
  const isAddAndStay = query.addAndStay === "true"

  return isCartEnabled && isAddAndStay
    ? "addAndStay"
    : isCartEnabled
    ? "addAndCart"
    : "addAndCheckout"
}

const ButtonExperiences: Record<Experience, JSX.Element> = {
  addAndStay: <AddAndStay />,
  addAndCart: <AddAndCart />,
  addAndCheckout: <AddAndCheckout />,
}

export const AddToCartButton: FC = () => {
  const { query } = useRouter()
  const activeExperience = getExperience(query)

  return <>{ButtonExperiences[activeExperience]}</>
}
