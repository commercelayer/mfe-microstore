import {
  SkuField,
  AddToCartButton,
  AvailabilityTemplate,
} from "@commercelayer/react-components"
import styled from "styled-components"
import tw from "twin.macro"

import { ButtonCss } from "components/ui/Button"

export const Thumb = styled(SkuField)`
  ${tw`h-36 rounded-md w-full object-cover border border-gray-100`}
`

export const StyledAddToCartButton = styled(AddToCartButton)`
  ${ButtonCss}
`

export const Card = styled.div`
  ${tw`shadow-subtle rounded-lg flex gap-4 p-4 bg-white relative mb-4`}
`
export const CardBody = styled.div`
  ${tw`relative`}
`

export const CardImage = styled.figure`
  ${tw`relative w-7/12`}
`
export const CardTitle = styled.h3`
  ${tw`text-2xl`}
`

export const CardDesc = styled.p`
  ${tw`text-sm text-gray-600`}
`

// const StyledAvailabilityTemplate = styled(AvailabilityTemplate)(
//   ({ quantity }) => [
//     tw`font-bold my-3 text-sm text-green-400`,
//     quantity && quantity === 0 && tw`text-red-500`,
//     quantity && quantity > 0 && tw`text-green-400`,
//   ]
// )

export const CardStock = styled.div`
  ${tw`flex text-gray-400 items-center gap-2 text-xs mt-4`}
`

export const CardFooter = styled.div`
  ${tw`flex flex-col mt-4`}
`
export const CardPrice = styled.div`
  ${tw`flex justify-between`}
`

export const Divider = styled.hr`
  ${tw`my-4`}
`

export const SKU = styled(SkuField)`
  ${tw`font-bold text-gray-400`}
`
