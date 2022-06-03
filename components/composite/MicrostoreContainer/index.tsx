import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"
import { useRouter } from "next/router"
import { useState } from "react"

import { TopNav } from "../TopNav"

import { MicrostoreHead } from "components/composite/MicrostoreHead"
import GlobalStylesProvider from "components/data/GlobalStylesProvider"
import { Base } from "components/ui/Base"
import { Container } from "components/ui/Container"
import { Footer } from "components/ui/Footer"
import { makeCartUrl } from "components/utils/makeCartUrl"

interface Props {
  settings: Settings
  couponCode?: string
}

const MicrostoreContainer: React.FC<Props> = ({
  settings,
  couponCode,
  children,
}) => {
  const { query } = useRouter()
  const isCartEnabled = Boolean(query.cart)
  const returnUrl = window.location.href

  // we set cart url as internal state. In this way, once we get the order id
  // the <OrderContainer> will receive the proper url and will update the order
  const [cartUrl, setCartUrl] = useState<string>()
  const updateCartUrl = (orderId?: string) => {
    if (!cartUrl && orderId && isCartEnabled) {
      setCartUrl(
        makeCartUrl({
          basePath: "cart",
          orderId,
          accessToken: settings.accessToken,
        })
      )
    }
  }

  return (
    <CommerceLayer
      accessToken={settings.accessToken}
      endpoint={settings.endpoint}
    >
      <GlobalStylesProvider primaryColor={settings.primaryColor} />
      <OrderStorage persistKey={`cl:${settings.slug}:orderId`}>
        <OrderContainer
          attributes={{
            coupon_code: couponCode,
            cart_url: cartUrl,
            return_url: returnUrl,
          }}
          fetchOrder={(order) => {
            updateCartUrl(order.id)
          }}
        >
          <Base>
            <MicrostoreHead
              title={settings.companyName}
              favicon={settings.favicon}
            />
            <TopNav
              logoUrl={settings.logoUrl}
              companyName={settings.companyName}
              showCartIcon={isCartEnabled}
              cartUrl={cartUrl}
            />
            <Container>
              {children}
              <Footer />
            </Container>
          </Base>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export default MicrostoreContainer
