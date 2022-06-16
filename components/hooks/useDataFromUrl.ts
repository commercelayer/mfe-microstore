import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useDataFromUrl = () => {
  const router = useRouter()
  const [data, setData] = useState<UrlData>({
    skus: [],
  })

  useEffect(() => {
    if (router.isReady) {
      const {
        skus,
        couponCode,
        title,
        description,
        accessToken,
        cart,
        inline,
      } = router.query
      setData({
        skus: parseQuerySkuValue(skus),
        description: parseQueryValue(description),
        title: parseQueryValue(title),
        couponCode: parseQueryValue(couponCode),
        accessToken: parseQueryValue(accessToken),
        cart: parseBooleanValue(cart),
        inline: parseBooleanValue(inline),
      })
    }
  }, [router])

  return data
}

const parseQueryValue = (
  value: string | string[] | undefined
): string | undefined => {
  if (!value || Array.isArray(value)) {
    return undefined
  }

  return value
}

const parseBooleanValue = (value: string | string[] | undefined): boolean => {
  if (!value || Array.isArray(value) || value !== "true") {
    return false
  }

  return true
}

export const parseQuerySkuValue = (
  value: string | string[] | undefined
): SkuWithQuantity[] => {
  if (!value || Array.isArray(value)) {
    return []
  }

  const skuList = (value || "").split(",").filter((v) => !!v)
  return skuList.map(parseSkuWithQuantity).filter(({ skuCode }) => !!skuCode)
}

export const parseSkuWithQuantity = (
  skuWithQuantity: string
): SkuWithQuantity => {
  const parsed = skuWithQuantity.trim().split(":") as
    | [string, string]
    | [string]
  const skuCode = parsed[0].trim()
  const quantity = parseInt((parsed[1] && parsed[1].trim()) || "0")

  return {
    skuCode,
    quantity: isNaN(quantity) ? 0 : quantity > 0 ? quantity : 0,
  }
}
