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
      {({
        isLoading: isLoadingSkus,
        isError: isErrorSkus,
        data: skusListDetails,
      }) =>
        isLoadingSkus ? (
          <SkeletonLoader />
        ) : isErrorSkus || !skusListDetails ? (
          <ErrorContainer
            errorCode="Error"
            errorMessage="This SKU List is not accessibile"
          />
        ) : (
          <MicrostoreContainer settings={settings} couponCode={couponCode}>
            <BuyAllProvider settings={settings} skus={skusListDetails?.skus}>
              <Microstore
                skus={skusListDetails?.skus}
                couponCode={couponCode}
                title={skusListDetails?.title}
                description={skusListDetails?.description}
              />
            </BuyAllProvider>
          </MicrostoreContainer>
        )
      }
    </SkuListProvider>
  )
}

export default SkuListPage
