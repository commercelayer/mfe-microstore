import { useEffect, useState } from "react"

export const useDataFromUrl = () => {
  const [data, setData] = useState<UrlData>({})
  const search = new URLSearchParams(window.location.search)

  useEffect(() => {
    if (search) {
      const couponCode = search.get("couponCode") || undefined
      const title = search.get("title") || undefined
      const description = search.get("description") || undefined
      const accessToken = search.get("accessToken") || undefined
      const cart = search.get("cart") || undefined
      const inline = search.get("inline") || undefined
      const all = search.get("all") || undefined

      setData({
        description: parseQueryValue(description),
        title: parseQueryValue(title),
        couponCode: parseQueryValue(couponCode),
        accessToken: parseQueryValue(accessToken),
        cart: parseBooleanValue(cart),
        inline: parseBooleanValue(inline),
        all: parseBooleanValue(all),
      })
    }
  }, [])

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
