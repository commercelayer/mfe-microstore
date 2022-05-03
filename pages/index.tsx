import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Microstore } from "components/composite/Microstore"
import MicrostoreContainer from "components/composite/MicrostoreContainer"
import SkeletonLoader from "components/composite/SkeletonLoader"
import { useSettings } from "components/hooks/useSettings"

const Home: NextPage = () => {
  const router = useRouter()

  const { settings, retryOnError, isLoading } = useSettings()
  const [skusArray, setSkusArray] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [couponCode, setCouponCode] = useState("")

  useEffect(() => {
    if (router.isReady) {
      const { skus, coupon_code } = router.query
      if (skus) {
        setSkusArray((skus as string).split(","))
      }
      if (router.query.title) {
        setTitle(router.query.title as string)
      }
      if (router.query.description) {
        setDescription(router.query.description as string)
      }
      if (coupon_code) {
        setCouponCode(coupon_code as string)
      }
    }
  }, [router])

  if (isLoading || (!settings && !retryOnError)) return <SkeletonLoader />

  if (!settings) {
    if (retryOnError) {
      return <p>retry</p>
    }
    return <p>retry</p>
  }

  if (skusArray.length === 0) {
    return <p>No skus</p>
  }

  return (
    <>
      <MicrostoreContainer settings={{ ...settings, couponCode }}>
        <Microstore
          skus={skusArray}
          couponCode={couponCode}
          title={title}
          description={description}
        />
      </MicrostoreContainer>
    </>
  )
}

export default Home
