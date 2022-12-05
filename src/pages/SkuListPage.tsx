import { useRoute } from "wouter"

import { ErrorContainer } from "#components/composite/ErrorContainer"
import { Microstore } from "#components/composite/Microstore"
import MicrostoreContainer from "#components/composite/MicrostoreContainer"
import SkeletonLoader from "#components/composite/SkeletonLoader"
import { BuyAllProvider } from "#providers/BuyAllProvider"
import { useSettings } from "#providers/SettingsProvider"
import { SkuListProvider } from "#providers/SkuListProvider"

function SkuListPage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [match, params] = useRoute("/list/:skuListId")
  const skuListId = params?.skuListId as string
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
    <SkuListProvider settings={settings} skuListId={skuListId}>
      {(skuList) => {
        if (skuList.isLoading) {
          return <SkeletonLoader />
        }

        if (skuList.isError || !skuList.data) {
          return (
            <ErrorContainer
              errorCode="Error"
              errorMessage="This SKU List is not accessible"
            />
          )
        }

        return (
          <MicrostoreContainer settings={settings} couponCode={couponCode}>
            <BuyAllProvider settings={settings} skus={skuList.data.skus}>
              <Microstore
                skus={skuList.data.skus}
                couponCode={couponCode}
                title={skuList.data.title}
                description={skuList.data.description}
              />
            </BuyAllProvider>
          </MicrostoreContainer>
        )
      }}
    </SkuListProvider>
  )
}

export default SkuListPage
