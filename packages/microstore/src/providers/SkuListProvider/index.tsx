import { CommerceLayer } from "@commercelayer/sdk"
import { FC, ReactNode, useState, useEffect, useCallback } from "react"

import { normalizeSkusInList } from "./normalizeSkusInList"

import { withVariants } from "#providers/SkuListProvider/withVariants"

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
    products: Record<string, unknown[]>
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
  const [products, setProducts] = useState({})
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
          skus: ["code", "reference"],
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

        if (withVariants(products)) {
          const prod = await cl.skus.list({
            filters: { code_in: products.map((p) => p.skuCode).join(",") },
            include: ["prices"],
          })

          const productsWithVariants = prod.reduce(function (r, a) {
            const k = a.reference || "noReference"
            r[k] = r[k] || []
            r[k].push(a)
            return r
          }, Object.create(null))
          setProducts(productsWithVariants)
        }
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
          products,
        },
      })}
    </>
  )
}
