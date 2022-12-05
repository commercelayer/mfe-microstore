import { FC } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import { Button } from "#components/ui/Button"
import { useBuyAll } from "#providers/BuyAllProvider"

export const ButtonBuyAll: FC = () => {
  const { isBuyingAll, showBuyAllButton, buyAllSkus, errorMessage } =
    useBuyAll()

  if (!showBuyAllButton) {
    return null
  }

  return (
    <Wrapper>
      <Button
        data-test-id="button-buy-all"
        disabled={isBuyingAll}
        onClick={() => buyAllSkus()}
      >
        Buy all
      </Button>
      {errorMessage && (
        <div className="text-sm text-red-400">{errorMessage}</div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-end px-8 pt-5 md:px-0 md:pt-0`}
`
