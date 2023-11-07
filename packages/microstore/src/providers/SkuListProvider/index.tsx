import { CommerceLayer, Price, Sku, SkuList } from "@commercelayer/sdk"
import { FC, ReactNode, useState, useEffect, useCallback } from "react"

import { normalizeSkusInList } from "./normalizeSkusInList"

import { SkuWithQuantity } from "@typings/urlData"

export type SimpleSkuList = Pick<SkuList, "name" | "description" | "metadata">

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>

export type SkuWithPrices = OptionalExceptFor<
  Sku,
  "name" | "code" | "reference"
> & {
  prices?: Price[]
}
type SkuListProviderChildrenProps = {
  /**
   * This will be set to `true` during SKU List data fetching
   */
  isLoading: boolean
  /**
   * Unable to fetch SKU List info from the given `skuListId`
   */
  isError?: boolean
  /**
   * The SKU List fetched data that we need in order to render the microstore
   */
  data?: {
    list?: SimpleSkuList
    skus: SkuWithQuantity[]
  }
}

type SkuListProviderProps = {
  /**
   * Settings returned from `useSettings` hook
   */
  settings: Settings
  /**
   * The SKU List resource id we want to use in this microstore.
   *
   * {@link https://docs.commercelayer.io/developers/v/api-reference/sku_lists Check API reference}
   */
  skuListId: string
  /**
   * Use it to limit items found in SKU List to a specific amount, default is 12
   */
  itemsLimit?: number
  children: (props: SkuListProviderChildrenProps) => ReactNode
}

export const SkuListProvider: FC<SkuListProviderProps> = ({
  settings,
  skuListId,
  children,
  itemsLimit = 12,
}) => {
  const [skuList, setSkuList] = useState<SimpleSkuList>()
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
        include: ["sku_list_items", "skus", "skus.prices"],
        fields: {
          sku_lists: [
            "name",
            "description",
            "sku_list_items",
            "skus",
            "manual",
            "metadata",
          ],
          sku_list_items: ["sku_code", "quantity"],
          skus: [
            "code",
            "reference",
            "name",
            "description",
            "metadata",
            "image_url",
            "prices",
          ],
          prices: [
            "formatted_amount",
            "formatted_compare_at_amount",
            "compare_at_amount_float",
            "amount_float",
          ],
        },
      })

      if (skuList) {
        setSkuList({
          name: skuList.name,
          description: skuList.description,
          metadata: skuList.metadata,
        })
        const products = normalizeSkusInList(skuList).slice(0, itemsLimit)
        setSkus(products)
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
          list: skuList,
          skus,
        },
      })}
    </>
  )
}
