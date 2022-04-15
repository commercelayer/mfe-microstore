import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Microstore } from "components/composite/Microstore"
import MicrostoreContainer from "components/composite/MicrostoreContainer"
import { useSettings } from "components/hooks/useSettings"

const Home: NextPage = () => {
  const router = useRouter()

  const { settings, retryOnError, isLoading } = useSettings()
  const [skusArray, setSkusArray] = useState<string[]>([])
  const [couponCode, setCouponCode] = useState("")

  console.log(settings, retryOnError, isLoading)

  useEffect(() => {
    if (router.isReady) {
      const { skus, coupon_code } = router.query
      console.log("skus", skus)
      if (skus) {
        setSkusArray((skus as string).split(","))
      }
      if (coupon_code) {
        setCouponCode(coupon_code as string)
      }
    }
  }, [router])

  if (isLoading || (!settings && !retryOnError)) return <p>loading skeleton</p>

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
        <Microstore skus={skusArray} couponCode={couponCode} />
      </MicrostoreContainer>
    </>
  )
}

export default Home
