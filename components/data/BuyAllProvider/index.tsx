import { Order } from "@commercelayer/sdk"
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

type BuyAllProviderValue = {
  showBuyAllButton: boolean
  isBuyingAll: boolean
  buyAll: () => Promise<Order | undefined>
  updateQuantity: (sku?: SkuWithQuantity) => void
}

export const BuyAllContext = createContext<BuyAllProviderValue>({
  showBuyAllButton: false,
  isBuyingAll: false,
  buyAll: async () => undefined,
  updateQuantity: () => undefined,
})

interface Props {
  children: ((props: BuyAllProviderValue) => ReactNode) | ReactNode
  settings: Settings
}

export const BuyAllProvider: FC<Props> = ({ children, settings }) => {
  const { skus, all } = useDataFromUrl()
  const [internalSkus, setInteralSkus] = useState<SkuWithQuantity[]>([])
  const [isBuyingAll, setIsBuyingAll] = useState(false)
  const [showBuyAllButton, setShowBuyAllButton] = useState(false)

  useEffect(() => {
    setShowBuyAllButton(!!all)
  }, [all])

  useEffect(() => {
    setInteralSkus(skus)
  }, [skus])

  const buyAll = async () => {
    setIsBuyingAll(true)
    try {
      console.log("internalSkus", internalSkus)
      const order = await buyAllSkus({
        skus: internalSkus,
        accessToken: settings.accessToken,
        domain: settings.domain,
        slug: settings.slug,
      })

      return order
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
    buyAll,
    isBuyingAll,
    updateQuantity,
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
