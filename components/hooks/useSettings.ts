import { useRouter } from "next/router"
import { useRef } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface UseSettings {
  settings: Settings | undefined
  retryOnError?: boolean
  isLoading: boolean
}

export const useSettings = (): UseSettings => {
  const random = useRef(Date.now())
  const router = useRouter()
  const { accessToken } = router.query

  const { data: settings, error } = useSWR(
    router.isReady
      ? [`/microstore/api/settings?accessToken=${accessToken}`, random]
      : null,
    fetcher,
    { revalidateOnFocus: false }
  )
  const isLoading = !settings && !error

  if (error || (settings && !settings.valid)) {
    if (!settings?.retryOnError) {
      router.push("/404")
    }
  }

  return {
    settings,
    isLoading,
  }
}
