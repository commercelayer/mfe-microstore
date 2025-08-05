import { CommerceLayer, type Price, type Sku } from "@commercelayer/sdk"
import type { SkuWithQuantity } from "@typings/urlData"
import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react"

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>

export type SkuWithPrices = OptionalExceptFor<
  Sku,
  "name" | "code" | "reference"
> & {
  prices?: Price[]
}
type SkuProviderChildrenProps = {
  /**
   * This will be set to `true` during SKU data fetching
   */
  isLoading: boolean
  /**
   * Unable to fetch SKU info from the given `skuId`
   */
  isError?: boolean
  /**
   * The SKU fetched data that we need in order to render the microstore
   */
  data?: {
    skus: SkuWithQuantity[]
  }
}

type SkuProviderProps = {
  /**
   * Settings returned from `useSettings` hook
   */
  settings: Settings
  /**
   * The SKU resource id we want to use in this microstore.
   *
   * {@link https://docs.commercelayer.io/developers/v/api-reference/skus Check API reference}
   */
  skuId: string
  children: (props: SkuProviderChildrenProps) => ReactNode
}

export const SkuProvider: FC<SkuProviderProps> = ({
  settings,
  skuId,
  children,
}) => {
  const [sku, setSku] = useState<SkuWithQuantity>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchSkuInfo = useCallback(async () => {
    setIsLoading(true)
    const cl = CommerceLayer({
      organization: settings.slug,
      accessToken: settings.accessToken,
      domain: settings.domain,
    })

    try {
      const skuFetched = (await cl.skus.retrieve(skuId, {
        include: ["prices"],
      })) as SkuWithPrices

      if (skuFetched) {
        setSku({ sku: skuFetched, quantity: 1 })
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    }
  }, [settings, skuId])

  useEffect(() => {
    if (!skuId || !settings) {
      return
    }
    fetchSkuInfo()
  }, [skuId, settings])

  useEffect(() => {
    if (sku || isError) {
      setIsLoading(false)
    }
  }, [sku, isError])

  return (
    <>
      {children({
        isLoading,
        isError,
        data: sku && {
          skus: [sku],
        },
      })}
    </>
  )
}
