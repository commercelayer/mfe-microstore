/**
 * @returns the value of `accessToken` query string parameter or `undefined` if it's not present.
 */
export const getAccessTokenFromUrl = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    return params.get("accessToken") || undefined
  }
}
