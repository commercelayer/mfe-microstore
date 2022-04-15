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
  gtmId?: string
  supportEmail?: string
  supportPhone?: string
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
  | "gtmId"
  | "supportEmail"
  | "supportPhone"
>
