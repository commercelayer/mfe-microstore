import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"
import { GlobalStylesProvider } from "@commercelayer/react-utils"
import { ReactNode } from "react"

import { MicrostoreHead } from "#components/composite/MicrostoreHead"
import { TopNav } from "#components/composite/TopNav"
import { Base } from "#components/ui/Base"
import { Container } from "#components/ui/Container"
import { Footer } from "#components/ui/Footer"
import { useDataFromUrl } from "#hooks/useDataFromUrl"

interface Props {
  settings: Settings
  couponCode?: string
  children: ReactNode
}

function MicrostoreContainer({
  settings,
  couponCode,
  children,
}: Props): JSX.Element {
  const { cart } = useDataFromUrl()
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
            return_url: returnUrl,
          }}
        >
          <Base>
            <MicrostoreHead
              title={settings.companyName}
              favicon={settings.faviconUrl}
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
