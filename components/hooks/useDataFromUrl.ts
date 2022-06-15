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

  const syncUrl = (urlDataToSync: Partial<UrlData>) => {
    const newUrlData = { ...data, ...urlDataToSync }
    router.push(
      {
        query: transformUrlDataToQueryObject(newUrlData),
      },
      undefined,
      {
        scroll: false,
      }
    )
  }

  return {
    ...data,
    syncUrl,
  }
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

export const transformUrlDataToQueryObject = (urlData: UrlData) => {
  const newQuery = {
    skus: urlData.skus.map((s) => `${s.skuCode}:${s.quantity}`).join(","),
    description: urlData.description,
    title: urlData.title,
    couponCode: urlData.couponCode,
    accessToken: urlData.accessToken,
    cart: urlData.cart,
    inline: urlData.inline,
  }

  Object.keys(newQuery).forEach((k) => {
    const paramName = k as keyof typeof newQuery
    if (newQuery[paramName] === undefined) {
      delete newQuery[paramName]
    }
  })

  return newQuery
}
