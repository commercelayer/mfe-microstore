export declare global {
  interface CommerceLayerAppConfig {
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
