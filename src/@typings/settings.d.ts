interface Settings {
  /**
   * Access Token for a sales channel API credentials to be used to authenticate all Commerce Layer API requests.
   * Read more at {@link https://docs.commercelayer.io/developers/authentication/client-credentials#sales-channel}
   */
  accessToken: string
  /**
   * Base endpoint URL to be used for API requests by `@commercelayer/react-components` library.
   * Example: `https://yourdomain.commercelayer.io`
   * Read more at {@link https://docs.commercelayer.io/developers/api-specification#base-endpoint}.
   */
  endpoint: string
  /**
   * This flag allows TypeScript to discriminate between `Settings` and `InvalidSettings` union type.
   */
  isValid: true
  /**
   * Logo URL found in current organization (if set).
   * Read more at {@link https://docs.commercelayer.io/developers/v/api-reference/organization/object}.
   */
  logoUrl?: string
  /**
   * Organization name.
   * Read more at {@link https://docs.commercelayer.io/developers/v/api-reference/organization/object}.
   */
  companyName: string
  /**
   * Organization slug.
   * Read more at {@link https://docs.commercelayer.io/developers/v/api-reference/organization/object}.
   */
  slug: string
  /**
   * Primary color HEX code found, if set, in current organization.
   * It will be used to generate custom CSS (example: primary button style).
   */
  primaryColor: string
  /**
   * Favicon URL found, if set, in current organization
   * Read more at {@link https://docs.commercelayer.io/developers/v/api-reference/organization/object}.
   */
  faviconUrl: string
  domain: string
}

type InvalidSettings = Pick<
  Settings,
  "primaryColor" | "faviconUrl" | "companyName" | "logoUrl"
> & {
  /**
   * This flag allows TypeScript to discriminate between `Settings` and `InvalidSettings` union type.
   */
  isValid: false
  /**
   * When `true`, it indicates the encountered error might be temporary (eg. connectivity error)
   * and the user can manually retry by refreshing browser tab.
   */
  retryable: boolean
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
