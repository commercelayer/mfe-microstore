import {
  SkuField,
  AddToCartButton,
  AvailabilityTemplate,
} from "@commercelayer/react-components"
import styled from "styled-components"
import tw from "twin.macro"

import { ButtonCss } from "components/ui/Button"

export const Thumb = styled(SkuField)`
  ${tw`h-36 border rounded-md w-full object-cover mb-2`}
`

export const StyledAddToCartButton = styled(AddToCartButton)`
  ${ButtonCss}
`

export const Card = styled.div`
  ${tw`shadow p-4 bg-white relative sm:w-1/2 lg:w-1/3`}
`

// const StyledAvailabilityTemplate = styled(AvailabilityTemplate)(
//   ({ quantity }) => [
//     tw`font-bold my-3 text-sm text-green-400`,
//     quantity && quantity === 0 && tw`text-red-500`,
//     quantity && quantity > 0 && tw`text-green-400`,
//   ]
// )

export const StyledAvailabilityTemplate = styled(AvailabilityTemplate)`
  ${tw`font-bold my-3 text-sm text-green-400`}
`

export const CardFooter = styled.div`
  ${tw`bg-gray-50 flex rounded mt-4 flex justify-center`}
`
export const Divider = styled.hr`
  ${tw`my-4`}
`

export const SKU = styled(SkuField)`
  ${tw`font-bold text-gray-400`}
`
