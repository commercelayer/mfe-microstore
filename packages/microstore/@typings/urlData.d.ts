type SkuWithQuantity = {
  skuCode: string
  quantity: number
  reference?: string | undefined | null
}

type UrlData = {
  description?: string
  title?: string
  couponCode?: string
  accessToken?: string
  cart?: boolean
  inline?: boolean
  lang?: string
  all?: boolean // buy all
}
