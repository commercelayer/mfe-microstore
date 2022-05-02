import { DiscountBanner } from "../DiscountBanner"

import { Title, Description, Wrapper } from "./styled"

interface Props {
  couponCode?: string
  title?: string
  description?: string
}

export const Hero = ({ title, description, couponCode }: Props) => {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {description && <Description> {description}</Description>}
      <DiscountBanner couponCode={couponCode} />
    </Wrapper>
  )
}
