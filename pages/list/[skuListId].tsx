import type { NextPage } from "next"
import { useRouter } from "next/router"

import { ErrorContainer } from "components/composite/ErrorContainer"
import { Microstore } from "components/composite/Microstore"
import MicrostoreContainer from "components/composite/MicrostoreContainer"
import SkeletonLoader from "components/composite/SkeletonLoader"
import { BuyAllProvider } from "components/data/BuyAllProvider"
import { SkuListProvider } from "components/data/SkuListProvider"
import { useSettings } from "components/hooks/useSettings"

const SkuListPage: NextPage = () => {
  const { query } = useRouter()
  const skuListId = query.skuListId as string
  const couponCode = query.couponCode as string | undefined
  const { settings, isLoading: isLoadingSettings, retryOnError } = useSettings()

  if (retryOnError) {
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
              errorMessage="This SKU List is not accessibile"
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
