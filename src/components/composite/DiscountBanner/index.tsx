import { Text } from "./styled"

interface Props {
  couponCode?: string
}

export const DiscountBanner = ({ couponCode }: Props) => {
  if (!couponCode) return null
  return <Text>20% additional discount applied on checkout.</Text>
}
