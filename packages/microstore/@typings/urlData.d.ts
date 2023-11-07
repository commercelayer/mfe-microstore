import { SkuWithPrices } from "#providers/SkuListProvider"

type SkuWithQuantity = {
  quantity: number
  sku: SkuWithPrices
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
