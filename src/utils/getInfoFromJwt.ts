import jwtDecode from "jwt-decode"

type JWTProps = {
  /**
   * The Organization `slug` and `id` present in the provided access token.
   */
  organization: {
    slug: string
    id: string
  }
  /**
   * The API credentials `kind`, for example "sales_channel".
   * Read more at {@link https://docs.commercelayer.io/developers/api-clients}
   */
  application: {
    kind: string
  }
  /**
   * If `true` it means the  Organization is working in test mode and live mode is not enabled.
   */
  test: boolean
}

/**
 * Decodes a JWT string in order to retrive some required organization info.
 *
 * @param accessToken - The Bearer JWT token used to authenticate Commerce Layer API request.
 * @returns an object of type `JWTProps` or an empy object in case of failure.
 *
 */
export const getInfoFromJwt = (accessToken: string) => {
  try {
    const {
      organization: { slug },
      application: { kind },
      test,
    } = jwtDecode(accessToken) as JWTProps

    return { slug, kind, isTest: test }
  } catch (e) {
    return {}
  }
}
