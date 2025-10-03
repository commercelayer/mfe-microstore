interface Props {
  couponCode?: string
}

export const DiscountBanner = ({ couponCode }: Props) => {
  if (!couponCode) return null
  return (
    <div className="text-sm text-gray-600">
      20% additional discount applied on checkout.
    </div>
  )
}
