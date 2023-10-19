import { SkuField } from "@commercelayer/react-components"
import Styled from "styled-components"
import tw from "twin.macro"

export const Thumb = Styled(SkuField)`
  ${tw`h-48 rounded-md w-full object-scale-down self-start p-1 border border-gray-100 md:(h-36)`}
`

export const Card = Styled.div`
  ${tw`shadow-subtle flex flex-col gap-6 p-8 bg-white relative my-8 md:(p-6 flex-row rounded-lg)`}
`
export const CardBody = Styled.div`
  ${tw`relative flex-1`}
`

export const CardImage = Styled.figure`
  ${tw`relative w-full md:(w-32)`}
`
export const CardTitle = Styled.h3`
  ${tw`text-2xl`}
`
export const CardDesc = Styled.div`
  ${tw`text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4`}
`

// const StyledAvailabilityTemplate = styled(AvailabilityTemplate)(
//   ({ quantity }) => [
//     tw`font-bold my-3 text-sm text-green-400`,
//     quantity && quantity === 0 && tw`text-red-500`,
//     quantity && quantity > 0 && tw`text-green-400`,
//   ]
// )

export const CardStock = Styled.div`
  ${tw`flex text-gray-400 items-center gap-2 text-xs mt-4`}
`

export const CardFooter = Styled.div`
  ${tw`flex flex-col mt-6`}
`
export const CardPrice = Styled.div`
  ${tw`flex flex-col gap-y-4 md:(flex-row justify-between)`}
`

export const CardPriceWrapper = Styled.div`
  ${tw`flex flex-row-reverse items-center self-start md:(self-center)`}
`

export const QuantityAndButtonWrapper = Styled.div`
  ${tw`flex flex-col sm:flex-row sm:items-center gap-2`}
`

export const SKU = Styled(SkuField)`
  ${tw`font-bold text-gray-400`}
`
export const CardDivider = Styled.hr`
  ${tw`block border-dashed`}
`
