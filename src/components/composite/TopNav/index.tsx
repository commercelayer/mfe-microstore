import {
  LineItemsCount,
  LineItemsContainer,
} from "@commercelayer/react-components"
import { FC } from "react"

import { CartIcon } from "./CartIcon"
import { Nav, Badge, CartLinkStyled } from "./styled"

import { Container } from "#components/ui/Container"
import { Header } from "#components/ui/Header"
import { Logo } from "#components/ui/Logo"

type Props = {
  logoUrl?: string
  companyName: string
  showCartIcon?: boolean
}

export const TopNav: FC<Props> = ({ logoUrl, companyName, showCartIcon }) => {
  return (
    <Header>
      <Container>
        <Nav>
          <Logo logoUrl={logoUrl} companyName={companyName} />
          {showCartIcon ? (
            <CartLinkStyled
              data-test-id="link-view-cart"
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
