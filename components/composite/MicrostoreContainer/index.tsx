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
  const [cartUrl, setCartUrl] = useState<string>()
  const returnUrl = window.location.href

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
            if (!cartUrl && order.id && isCartEnabled) {
              // setting cart url as internal state so it will be passed to `<OrderContainer>` attributes
              setCartUrl(
                makeCartUrl({
                  basePath: "cart",
                  orderId: order.id,
                  accessToken: settings.accessToken,
                })
              )
            }
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
