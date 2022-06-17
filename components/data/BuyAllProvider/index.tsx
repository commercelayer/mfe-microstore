import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"
import { buyAllSkus } from "components/utils/buyAllSkus"
import { makeHostedAppUrl } from "components/utils/makeHostedAppUrl"

type BuyAllProviderValue = {
  showBuyAllButton: boolean
  isBuyingAll: boolean
  buyAllSkus: () => Promise<void>
  updateQuantity: (sku?: SkuWithQuantity) => void
  skus: SkuWithQuantity[]
}

interface BuyAllProviderProps {
  children: ((props: BuyAllProviderValue) => ReactNode) | ReactNode
  settings: Settings
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
}) => {
  const { skus, all, cart } = useDataFromUrl()
  const [internalSkus, setInteralSkus] = useState<SkuWithQuantity[]>([])
  const [isBuyingAll, setIsBuyingAll] = useState(false)
  const [showBuyAllButton, setShowBuyAllButton] = useState(false)

  useEffect(() => {
    setShowBuyAllButton(!!all)
  }, [all])

  useEffect(() => {
    setInteralSkus(skus)
  }, [skus])

  const buyAllHandler = async () => {
    setIsBuyingAll(true)
    try {
      const order = await buyAllSkus({
        skus: setMinQuantityIfMissing(internalSkus),
        accessToken: settings.accessToken,
        domain: settings.domain,
        slug: settings.slug,
        setCartUrl: Boolean(cart),
      })

      if (cart) {
        window.location.href =
          order.cart_url ||
          makeHostedAppUrl({
            basePath: "cart",
            orderId: order.id,
            accessToken: settings.accessToken,
          })
        return
      }

      // when cart is not enable it's ok to take user directy to checkout
      window.location.href = makeHostedAppUrl({
        basePath: "checkout",
        orderId: order.id,
        accessToken: settings.accessToken,
      })
    } catch {
      setIsBuyingAll(false)
    }
  }

  const updateQuantity = (updatedSku?: SkuWithQuantity) => {
    if (!updatedSku) {
      return
    }
    setInteralSkus((state) =>
      state.map((s) => (s.skuCode === updatedSku.skuCode ? updatedSku : s))
    )
  }
  const value: BuyAllProviderValue = {
    showBuyAllButton,
    buyAllSkus: buyAllHandler,
    isBuyingAll,
    updateQuantity,
    skus: internalSkus,
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
