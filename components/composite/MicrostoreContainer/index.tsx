import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"

import { MainHeader } from "components/composite/MainHeader"
import { MicrostoreHead } from "components/composite/MicrostoreHead"
import GlobalStylesProvider from "components/data/GlobalStylesProvider"
import { Footer } from "components/ui/Footer"
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
  console.log(settings)

  const returnUrl = window.location.href
  return (
    <div className="w-auto min-h-screen bg-gray-50 ">
      <MicrostoreHead title={settings.companyName} favicon={settings.favicon} />
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
            <Logo
              logoUrl={settings.logoUrl}
              companyName={settings.companyName}
              className="block m-4"
            />
            <MainHeader />
            {children}
            <Footer />
          </OrderContainer>
        </OrderStorage>
      </CommerceLayer>
    </div>
  )
}

export default MicrostoreContainer
