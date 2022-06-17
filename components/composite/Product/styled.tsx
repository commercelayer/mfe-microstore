import { SkuField } from "@commercelayer/react-components"
import styled from "styled-components"
import tw from "twin.macro"

export const Thumb = styled(SkuField)`
  ${tw`h-48 rounded-md w-full object-scale-down self-start p-1 border border-gray-100 md:(h-36)`}
`

export const Card = styled.div`
  ${tw`shadow-subtle flex flex-col gap-6 p-8 bg-white relative my-8 md:(p-6 flex-row rounded-lg)`}
`
export const CardBody = styled.div`
  ${tw`relative flex-1`}
`

export const CardImage = styled.figure`
  ${tw`relative w-full md:(w-32)`}
`
export const CardTitle = styled.h3`
  ${tw`text-2xl`}
`
export const CardDesc = styled.div`
  ${tw`text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4`}
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
  ${tw`flex flex-col mt-6`}
`
export const CardPrice = styled.div`
  ${tw`flex flex-col gap-y-4 md:(flex-row justify-between)`}
`

export const CardPriceWrapper = styled.div`
  ${tw`flex flex-row-reverse items-center self-start md:(self-center)`}
`

export const QuantityAndButtonWrapper = styled.div`
  ${tw`flex flex-col sm:flex-row sm:items-center gap-2`}
`

export const SKU = styled(SkuField)`
  ${tw`font-bold text-gray-400`}
`
export const CardDivider = styled.hr`
  ${tw`block border-dashed`}
`
