type SkuWithQuantity = {
  skuCode: string
  quantity: number
}

type UrlData = {
  skus: SkuWithQuantity[]
  description?: string
  title?: string
  couponCode?: string
  accessToken?: string
  cart?: boolean
  inline?: boolean
}
