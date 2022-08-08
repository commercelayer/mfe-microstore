import CommerceLayer from "@commercelayer/sdk"
import { FC, ReactNode, useState, useEffect, useCallback } from "react"

import { normalizeSkusInList } from "./normalizeSkusInList"

type SkuListProviderValue = {
  isLoading: boolean
  isError?: boolean
  data?: {
    title?: string
    description?: string
    skus: SkuWithQuantity[]
  }
}

interface SkuListProviderProps {
  settings: Settings
  skuListId: string
  maxSkusToShow?: number
  children: (props: SkuListProviderValue) => ReactNode
}

export const SkuListProvider: FC<SkuListProviderProps> = ({
  settings,
  skuListId,
  children,
  maxSkusToShow = 12,
}) => {
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [skus, setSkus] = useState<SkuWithQuantity[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchSkuListInfo = useCallback(async () => {
    setIsLoading(true)
    const cl = CommerceLayer({
      organization: settings.slug,
      accessToken: settings.accessToken,
      domain: settings.domain,
    })
    try {
      const skuList = await cl.sku_lists.retrieve(skuListId, {
        include: ["sku_list_items", "skus"],
      })

      if (skuList) {
        setTitle(skuList.name)
        setDescription(skuList.description)
        setSkus(normalizeSkusInList(skuList).slice(0, maxSkusToShow))
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    }
  }, [settings, skuListId])

  useEffect(() => {
    if (!skuListId || !settings) {
      return
    }
    fetchSkuListInfo()
  }, [skuListId, settings])

  useEffect(() => {
    if (skus || isError) {
      setIsLoading(false)
    }
  }, [skus, isError])

  return (
    <>
      {children({
        isLoading,
        isError,
        data: skus && {
          title,
          description,
          skus,
        },
      })}
    </>
  )
}
