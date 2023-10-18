export declare global {
  interface CommerceLayerAppConfig {
    /**
     * Specific domain to use for Commerce Layer API requests.
     * It must be set as `commercelayer.io`.
     */
    domain: string
    /**
     * When `isCommerceLayerHosted` is false this is required
     */
    selfHostedSlug?: string | null
  }

  interface Window {
    /**
     * Commerce Layer app configuration available from global window object
     */
    clAppConfig: CommerceLayerAppConfig
  }
}
