interface RuntimeConfig {
  /**
   * Specific custom domain to use for commerce layer api requests
   */
  domain: string
  /**
   * Enable check for organization slug that should matches current subdomain
   */
  isHosted?: boolean
  /**
   * When `isCommerceLayerHosted` is false this is required
   */
  selfHostedSlug?: string | null
}
