import { Order } from "@commercelayer/sdk"
import { FC, useState } from "react"
import styled from "styled-components"

import { useDataFromUrl } from "components/hooks/useDataFromUrl"
import { ButtonCss } from "components/ui/Button"
import { buyAllSkus } from "components/utils/buyAllSkus"

interface Props {
  settings: Settings
  onSuccess: (order: Order) => void
  onError?: () => void
}

export const BuyAllButton: FC<Props> = ({ settings, onSuccess, onError }) => {
  const [isBuyingAll, setIsBuyingAll] = useState(false)
  const { skus } = useDataFromUrl()
  const skusWithQuantity = skus.map((s) => ({
    skuCode: s,
    quantity: 1,
  }))

  const buyAllHandler = async () => {
    setIsBuyingAll(true)
    try {
      const order = await buyAllSkus({
        skus: skusWithQuantity,
        accessToken: settings.accessToken,
        domain: settings.domain,
        slug: settings.slug,
      })
      onSuccess(order)
    } catch {
      onError && onError()
      setIsBuyingAll(true)
    }
  }

  return (
    <Button disabled={isBuyingAll} onClick={buyAllHandler}>
      Buy all
    </Button>
  )
}

const Button = styled.button`
  ${ButtonCss}
`
