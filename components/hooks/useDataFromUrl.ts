import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useDataFromUrl = () => {
  const router = useRouter()
  const [data, setData] = useState<UrlData>({})

  useEffect(() => {
    if (router.isReady) {
      const { couponCode, title, description, accessToken, cart, inline, all } =
        router.query

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
