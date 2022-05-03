interface HSLProps {
  h: number
  s: string
  l: string
}

interface Settings {
  accessToken: string
  valid: boolean
  endpoint: string
  domain: string
  slug: string
  logoUrl?: string
  companyName: string
  primaryColor: HSLProps
  favicon: string
  skus?: string[]
  couponCode?: string
}

type MicrostorePageContextProps = Pick<
  Settings,
  | "accessToken"
  | "logoUrl"
  | "companyName"
  | "endpoint"
  | "language"
  | "primaryColor"
  | "favicon"
>
