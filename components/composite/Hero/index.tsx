import { DiscountBanner } from "../DiscountBanner"

import { Title, Wrapper } from "./styled"

interface Props {
  couponCode?: string
}

export const Hero = ({ couponCode }: Props) => {
  return (
    <Wrapper>
      <Title>Hello,</Title>
      <DiscountBanner couponCode={couponCode} />
    </Wrapper>
  )
}
