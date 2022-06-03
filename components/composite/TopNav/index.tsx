import {
  LineItemsCount,
  LineItemsContainer,
} from "@commercelayer/react-components"
import { FC } from "react"

import { Container } from "components/ui/Container"
import { Header } from "components/ui/Header"
import { Logo } from "components/ui/Logo"

import { CartIcon } from "./CartIcon"
import { Nav, Badge, CartLink } from "./styled"

type Props = {
  logoUrl?: string
  companyName: string
  showCartIcon?: boolean
  cartUrl?: string
}

export const TopNav: FC<Props> = ({
  logoUrl,
  companyName,
  showCartIcon,
  cartUrl,
}) => {
  return (
    <Header>
      <Container>
        <Nav>
          <Logo logoUrl={logoUrl} companyName={companyName} />
          {showCartIcon ? (
            <CartLink
              href={cartUrl}
              title={cartUrl ? "View cart" : "Your cart is empty"}
              className="relative"
              data-test-id="link-view-cart"
            >
              <CartIcon />
              <LineItemsContainer>
                <LineItemsCount>
                  {({ quantity }) =>
                    quantity ? (
                      <Badge data-test-id="cart-items-count">{quantity}</Badge>
                    ) : null
                  }
                </LineItemsCount>
              </LineItemsContainer>
            </CartLink>
          ) : null}
        </Nav>
      </Container>
    </Header>
  )
}
