import { LineItemsContainer } from "@commercelayer/react-components/line_items/LineItemsContainer"
import { LineItemsCount } from "@commercelayer/react-components/line_items/LineItemsCount"
import type { FC } from "react"

import { CartIcon } from "./CartIcon"
import { Badge, CartLinkStyled, Nav } from "./styled"

import { Container } from "#components/ui/Container"
import { Header } from "#components/ui/Header"
import { Logo } from "#components/ui/Logo"
import { openMiniCart } from "#utils/openMiniCart"

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
        <Nav>
          <Logo logoUrl={logoUrl} companyName={companyName} />
          {showCartIcon ? (
            <CartLinkStyled
              data-test-id="link-view-cart"
              {...(openMiniCart() && inline ? { type: "mini" } : {})}
              label={
                <>
                  <CartIcon />
                  <LineItemsContainer>
                    <LineItemsCount>
                      {({ quantity }) =>
                        quantity ? (
                          <Badge data-test-id="cart-items-count">
                            {quantity}
                          </Badge>
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
        </Nav>
      </Container>
    </Header>
  )
}
