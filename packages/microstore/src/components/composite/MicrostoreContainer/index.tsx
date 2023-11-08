import { CommerceLayer } from "@commercelayer/react-components/auth/CommerceLayer"
import { OrderContainer } from "@commercelayer/react-components/orders/OrderContainer"
import { OrderStorage } from "@commercelayer/react-components/orders/OrderStorage"
import { GlobalStylesProvider } from "@commercelayer/react-utils"
import { ReactNode, useEffect } from "react"
import { useTranslation } from "react-i18next"

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
  const { cart, lang } = useDataFromUrl()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

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
            language_code: lang,
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
