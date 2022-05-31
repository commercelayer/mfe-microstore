import {
  LineItemsCount,
  LineItemsContainer,
} from "@commercelayer/react-components"
import { FC } from "react"
import styled from "styled-components"

import { Container } from "components/ui/Container"
import { Header } from "components/ui/Header"
import { Logo } from "components/ui/Logo"

type Props = {
  logoUrl?: string
  companyName: string
  cartUrl: string
}

export const TopNav: FC<Props> = ({ logoUrl, companyName, cartUrl }) => {
  return (
    <Header>
      <Container>
        <Nav className="flex justify-between">
          <Logo logoUrl={logoUrl} companyName={companyName} />
          <a href={cartUrl} className="relative">
            <CartIcon />
            <LineItemsContainer>
              <LineItemsCount>
                {({ quantity }) =>
                  quantity ? (
                    <div className="absolute bottom-0 right-0 px-2 py-1 leading-none rounded-full text-[10px] bg-primary text-contrast">
                      {quantity}
                    </div>
                  ) : null
                }
              </LineItemsCount>
            </LineItemsContainer>
          </a>
        </Nav>
      </Container>
    </Header>
  )
}

const Nav = styled.div``

const CartIcon = () => {
  return (
    <svg width="32" height="33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27 6.98H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-18a1 1 0 0 0-1-1ZM4 10.98h24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14.98a5 5 0 0 1-10 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
