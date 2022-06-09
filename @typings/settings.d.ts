interface HSLProps {
  h: number
  s: string
  l: string
}

interface Settings {
  accessToken: string
  valid: true
  endpoint: string
  domain: string
  slug: string
  logoUrl?: string
  companyName: string
  primaryColor: HSLProps
  favicon: string
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
