import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type UrlData = {
  skus: string[]
  description?: string
  title?: string
  couponCode?: string
}

export const useDataFromUrl = () => {
  const router = useRouter()
  const [data, setData] = useState<UrlData>({
    skus: [],
  })

  useEffect(() => {
    if (router.isReady) {
      const { skus, coupon_code, title, description } = router.query
      setData({
        skus: parseQuerySkuValue(skus),
        description: parseQueryValue(description),
        title: parseQueryValue(title),
        couponCode: parseQueryValue(coupon_code),
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

const parseQuerySkuValue = (value: string | string[] | undefined): string[] => {
  if (!value || Array.isArray(value)) {
    return []
  }

  return (value || "").split(",").filter((v) => !!v)
}
