import { FC } from "react"

import { useBuyAll } from "components/data/BuyAllProvider"
import { Button } from "components/ui/Button"

export const ButtonBuyAll: FC = () => {
  const { isBuyingAll, showBuyAllButton, buyAllSkus, errorMessage } =
    useBuyAll()

  if (!showBuyAllButton) {
    return null
  }

  return (
    <div className="flex flex-col items-end">
      <Button disabled={isBuyingAll} onClick={() => buyAllSkus()}>
        Buy all
      </Button>
      {errorMessage && (
        <div className="text-sm text-red-400">{errorMessage}</div>
      )}
    </div>
  )
}
