import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"

import { MicrostoreHead } from "components/composite/MicrostoreHead"
import GlobalStylesProvider from "components/data/GlobalStylesProvider"
import { Base } from "components/ui/Base"
import { Container } from "components/ui/Container"
import { Footer } from "components/ui/Footer"
import { Header } from "components/ui/Header"
import { Logo } from "components/ui/Logo"

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
  return (
    <Base>
      <MicrostoreHead title={settings.companyName} favicon={settings.favicon} />
      <Header>
        <Container>
          <Logo logoUrl={settings.logoUrl} companyName={settings.companyName} />
        </Container>
      </Header>
      <Container>
        <CommerceLayer
          accessToken={settings.accessToken}
          endpoint={settings.endpoint}
        >
          <GlobalStylesProvider primaryColor={settings.primaryColor} />
          <OrderStorage persistKey="your-persist-key">
            <OrderContainer
              attributes={{
                coupon_code: couponCode,
                cart_url: returnUrl,
                return_url: returnUrl,
              }}
            >
              {children}
              <Footer />
            </OrderContainer>
          </OrderStorage>
        </CommerceLayer>
      </Container>
    </Base>
  )
}

export default MicrostoreContainer
