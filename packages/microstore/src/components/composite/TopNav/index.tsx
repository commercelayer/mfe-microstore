import { LineItemsContainer } from "@commercelayer/react-components/line_items/LineItemsContainer"
import { LineItemsCount } from "@commercelayer/react-components/line_items/LineItemsCount"
import { CartLink } from "@commercelayer/react-components/orders/CartLink"
import type { FC } from "react"
import { Container } from "#components/ui/Container"
import { Header } from "#components/ui/Header"
import { Logo } from "#components/ui/Logo"
import { openMiniCart } from "#utils/openMiniCart"
import { CartIcon } from "./CartIcon"

type Props = {
  logoUrl: string | undefined | null
  companyName: string
  showCartIcon?: boolean
  inline?: boolean
}

export const TopNav: FC<Props> = ({
  logoUrl,
  companyName,
  showCartIcon,
  inline,
}) => {
  return (
    <Header>
      <Container>
        <div className="flex justify-between items-center">
          <Logo logoUrl={logoUrl} companyName={companyName} />
          {showCartIcon ? (
            <CartLink
              className="block relative"
              data-test-id="link-view-cart"
              {...(openMiniCart() && inline ? { type: "mini" } : {})}
              label={
                <>
                  <CartIcon />
                  <LineItemsContainer>
                    <LineItemsCount>
                      {({ quantity }) =>
                        quantity ? (
                          <div
                            className="absolute px-2 py-1 leading-none rounded-full text-[10px] bg-primary text-contrast -bottom-1 -right-1.5"
                            data-test-id="cart-items-count"
                          >
                            {quantity}
                          </div>
                        ) : (
                          <div />
                        )
                      }
                    </LineItemsCount>
                  </LineItemsContainer>
                </>
              }
            />
          ) : null}
        </div>
      </Container>
    </Header>
  )
}
