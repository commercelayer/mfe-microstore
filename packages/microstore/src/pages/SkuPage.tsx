import { useRoute } from "wouter"

import { ErrorContainer } from "#components/composite/ErrorContainer"
import { Microstore } from "#components/composite/Microstore"
import MicrostoreContainer from "#components/composite/MicrostoreContainer"
import SkeletonLoader from "#components/composite/SkeletonLoader"
import { BuyAllProvider } from "#providers/BuyAllProvider"
import { useSettings } from "#providers/SettingsProvider"
import { SkuProvider } from "#providers/SkuProvider"

function SkuListPage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [match, params] = useRoute("/sku/:skuId")
  const skuId = params?.skuId as string
  const search = new URLSearchParams(window.location.search)
  const couponCode = search.get("couponCode") || undefined

  const { settings, isLoading: isLoadingSettings } = useSettings()

  if (!settings.isValid && settings.retryable) {
    return (
      <ErrorContainer
        errorCode="Connectivity issues"
        errorMessage="Try to reload the page"
      />
    )
  }

  if (isLoadingSettings || !settings) {
    return <SkeletonLoader />
  }

  if (settings && !settings.isValid) {
    return (
      <ErrorContainer
        errorCode="Error"
        errorMessage="This store is not accessible."
      />
    )
  }

  return (
    <SkuProvider settings={settings} skuId={skuId}>
      {(sku) => {
        if (sku.isLoading) {
          return <SkeletonLoader />
        }

        if (sku.isError || !sku.data) {
          return (
            <ErrorContainer
              errorCode="Error"
              errorMessage="This SKU is not accessible"
            />
          )
        }

        return (
          <MicrostoreContainer settings={settings} couponCode={couponCode}>
            <BuyAllProvider settings={settings} skus={sku.data.skus}>
              <Microstore skus={sku.data.skus} couponCode={couponCode} />
            </BuyAllProvider>
          </MicrostoreContainer>
        )
      }}
    </SkuProvider>
  )
}

export default SkuListPage
