import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { useDataFromUrl } from "#hooks/useDataFromUrl"
import { buyAllSkus } from "#utils/buyAllSkus"
import { makeHostedAppUrl } from "#utils/makeHostedAppUrl"

type BuyAllProviderValue = {
  showBuyAllButton: boolean
  isBuyingAll: boolean
  buyAllSkus: () => Promise<void>
  updateQuantity: (sku?: SkuWithQuantity) => void
  skus: SkuWithQuantity[]
  errorMessage?: string
}

interface BuyAllProviderProps {
  children: ((props: BuyAllProviderValue) => ReactNode) | ReactNode
  settings: Settings
  skus: SkuWithQuantity[]
}

const BuyAllContext = createContext<BuyAllProviderValue>({
  showBuyAllButton: false,
  isBuyingAll: false,
  buyAllSkus: async () => undefined,
  skus: [],
  updateQuantity: () => undefined,
})

export const BuyAllProvider: FC<BuyAllProviderProps> = ({
  children,
  settings,
  skus,
}) => {
  const { all, cart } = useDataFromUrl()
  const [internalSkus, setInternalSkus] = useState<SkuWithQuantity[]>([])
  const [isBuyingAll, setIsBuyingAll] = useState(false)
  const [showBuyAllButton, setShowBuyAllButton] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    setShowBuyAllButton(!!all)
  }, [all])

  useEffect(() => {
    setInternalSkus(skus)
  }, [skus])

  const buyAllHandler = async () => {
    setIsBuyingAll(true)
    setErrorMessage(undefined)
    try {
      const order = await buyAllSkus({
        skus: setMinQuantityIfMissing(internalSkus),
        accessToken: settings.accessToken,
        domain: settings.domain,
        slug: settings.slug,
      })

      if (!order) {
        setErrorMessage(
          "Something is wrong, please check your URL or refresh the page and try again"
        )
        return
      }

      if (cart) {
        window.location.href = makeHostedAppUrl({
          hostedApp: "cart",
          orderId: order.id,
          accessToken: settings.accessToken,
        })
        return
      }

      // when cart is not enable it's ok to take user directy to checkout
      window.location.href = makeHostedAppUrl({
        hostedApp: "checkout",
        orderId: order.id,
        accessToken: settings.accessToken,
        subdomain: settings.slug,
      })
    } catch {
      setIsBuyingAll(false)
      setErrorMessage(
        "Something is wrong, please check your URL or refresh the page and try again"
      )
    }
  }

  const updateQuantity = (updatedSku?: SkuWithQuantity) => {
    if (!updatedSku) {
      return
    }
    setInternalSkus((state) =>
      state.map((s) => (s.skuCode === updatedSku.skuCode ? updatedSku : s))
    )
  }
  const value: BuyAllProviderValue = {
    showBuyAllButton,
    buyAllSkus: buyAllHandler,
    isBuyingAll,
    updateQuantity,
    skus: internalSkus,
    errorMessage,
  }
  return (
    <BuyAllContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </BuyAllContext.Provider>
  )
}

export const useBuyAll = (): BuyAllProviderValue => {
  const ctx = useContext(BuyAllContext)
  return ctx
}

// when quantity selector is disabled, default quantity is 0
const setMinQuantityIfMissing = (skus: SkuWithQuantity[]) =>
  skus.map((s) =>
    s.quantity <= 0
      ? {
          ...s,
          quantity: 1,
        }
      : s
  )
