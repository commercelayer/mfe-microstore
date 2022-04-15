interface Props {
  couponCode?: string
}

export const DiscountBanner = ({ couponCode }: Props) => {
  if (!couponCode) return null
  return (
    <div className="w-full p-4 text-white bg-black">
      <h3 className="font-bold">Discounts over 50%</h3>
      <p className="text-sm">20% additional discount applied on checkout</p>
    </div>
  )
}
