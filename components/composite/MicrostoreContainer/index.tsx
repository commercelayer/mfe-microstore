import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"
import { useState } from "react"

import { MicrostoreHead } from "components/composite/MicrostoreHead"
import { TopNav } from "components/composite/TopNav"
import GlobalStylesProvider from "components/data/GlobalStylesProvider"
import { useDataFromUrl } from "components/hooks/useDataFromUrl"
import { Base } from "components/ui/Base"
import { Container } from "components/ui/Container"
import { Footer } from "components/ui/Footer"
import { makeHostedAppUrl } from "components/utils/makeHostedAppUrl"

interface Props {
  settings: Settings
  couponCode?: string
}

const MicrostoreContainer: React.FC<Props> = ({
  settings,
  couponCode,
  children,
}) => {
  const { cart } = useDataFromUrl()
  const returnUrl = window.location.href

  // we set cart url as internal state. In this way, once we get the order id
  // the <OrderContainer> will receive the proper url and will update the order
  const [cartUrl, setCartUrl] = useState<string>()
  const updateCartUrl = (orderId?: string) => {
    if (!cartUrl && orderId && cart) {
      setCartUrl(
        makeHostedAppUrl({
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
              showCartIcon={cart}
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
