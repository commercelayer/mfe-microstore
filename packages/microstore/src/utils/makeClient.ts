import { CommerceLayer } from "@commercelayer/sdk"

/**
 * Creates a Commerce Layer SDK client.
 *
 * @param accessToken - The Bearer JWT token used to authenticate Commerce Layer API request.
 */
export const makeClient = (accessToken: string) =>
  CommerceLayer({ accessToken, apiVersion: "2026-05" })
