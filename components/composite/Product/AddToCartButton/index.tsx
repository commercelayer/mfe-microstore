import { useRouter } from "next/router"
import { FC } from "react"

import { ParsedUrlQuery } from "querystring"

import { AddAndCart } from "./AddAndCart"
import { AddAndCheckout } from "./AddAndCheckout"
import { AddAndStay } from "./AddAndStay"

type Experiece = "addAndStay" | "addAndCart" | "addAndCheckout"

const getExperience = (query: ParsedUrlQuery): Experiece => {
  const isCartEnabled = query.cart === "true"
  const isAddAndStay = query.addAndStay === "true"

  return isCartEnabled && isAddAndStay
    ? "addAndStay"
    : isCartEnabled
    ? "addAndCart"
    : "addAndCheckout"
}

const ButtonExperiences: Record<Experiece, JSX.Element> = {
  addAndStay: <AddAndStay />,
  addAndCart: <AddAndCart />,
  addAndCheckout: <AddAndCheckout />,
}

export const AddToCardButton: FC = () => {
  const { query } = useRouter()
  const activeExperience = getExperience(query)

  return <>{ButtonExperiences[activeExperience]}</>
}
