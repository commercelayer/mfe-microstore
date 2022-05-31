import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"

import { TopNav } from "../TopNav"

import { MicrostoreHead } from "components/composite/MicrostoreHead"
import GlobalStylesProvider from "components/data/GlobalStylesProvider"
import { Base } from "components/ui/Base"
import { Container } from "components/ui/Container"
import { Footer } from "components/ui/Footer"

interface Props {
  settings: Settings
  couponCode?: string
}

const MicrostoreContainer: React.FC<Props> = ({
  settings,
  couponCode,
  children,
}) => {
  const returnUrl = window.location.href
  const cartUrl = window.location.href // TODO: add proper cart url

  return (
    <CommerceLayer
      accessToken={settings.accessToken}
      endpoint={settings.endpoint}
    >
      <GlobalStylesProvider primaryColor={settings.primaryColor} />
      <OrderStorage persistKey="your-persist-key">
        <OrderContainer
          attributes={{
            coupon_code: couponCode,
            cart_url: cartUrl,
            return_url: returnUrl,
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
