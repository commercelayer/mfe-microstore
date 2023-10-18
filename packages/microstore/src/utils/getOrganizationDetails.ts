import { CommerceLayerClient } from "@commercelayer/sdk"

import { retryCall } from "./retryCall"

type GetOrganizationsDetailsConfig = {
  /**
   * The signed Commerce Layer SDK client
   */
  client: CommerceLayerClient
}

/**
 * Retrieves the organization info with auto-retries in case of network or timout errors.
 *
 * @param config - the `GetOrganizationsDetailsConfig` object containing the signed sdk `client`
 * @returns an object containing the resolved `Organization` and the status of async operation.
 */
export const getOrganizationsDetails = async ({
  client,
}: GetOrganizationsDetailsConfig) =>
  retryCall(() => getAsyncOrganization(client))

const getAsyncOrganization = async (client: CommerceLayerClient) => {
  return await client.organization.retrieve({
    fields: {
      organizations: ["id", "logo_url", "name", "primary_color", "favicon_url"],
    },
  })
}
