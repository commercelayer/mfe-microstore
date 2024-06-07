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
    prices?: Price[]
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
  const [prices, setPrices] = useState<Price[]>()
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
        fields: {
          sku_lists: ["name", "description", "skus", "manual", "metadata"],
        },
      })
      const skuListItems = await cl.sku_lists.sku_list_items(skuListId, {
        fields: {
          sku_list_items: ["sku_code", "quantity"],
        },
        sort: {
          position: "asc",
        },
        pageSize: 25,
      })

      const skuFields = [
        "code",
        "reference",
        "name",
        "description",
        "metadata",
        "image_url",
      ] satisfies (keyof Sku)[]
      const skus = await cl.sku_lists.skus(skuListId, {
        fields: {
          skus: skuFields,
        },
        pageSize: 25,
      })
      if (skus.meta.recordCount > 25) {
        let pageNumber = 1
        do {
          const page = await cl.sku_lists.skus(skuListId, {
            fields: {
              skus: skuFields,
            },
            pageSize: 25,
            pageNumber,
          })
          if (page.length > 0) {
            skus.push(...page)
            pageNumber++
          }
        } while (pageNumber < skus.meta.pageCount)
        // Eventually we could set a custom limit to avoid giant results. Eg: `while (pageNumber < 4)`
      }

      const skuCodes = skus.map((sku) => sku.code)
      const skuPrices = await cl.prices.list({
        filters: { sku_code_in: skuCodes.join(",") },
        pageSize: 25,
      })
      if (skuPrices.meta.recordCount > 25) {
        let pageNumber = 1
        do {
          const page = await cl.prices.list({
            filters: { sku_code_in: skuCodes.join(",") },
            pageSize: 25,
            pageNumber,
          })
          if (page.length > 0) {
            skuPrices.push(...page)
            pageNumber++
          }
        } while (pageNumber < skuPrices.meta.pageCount)
      }

      if (skuPrices) {
        setPrices(skuPrices)
      }

      if (skuList) {
        setSkuList({
          name: skuList.name,
          description: skuList.description,
          metadata: skuList.metadata,
        })
        const products = normalizeSkusInList(skuList, skuListItems, skus).slice(
          0,
          itemsLimit
        )
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
          prices,
        },
      })}
    </>
  )
}
