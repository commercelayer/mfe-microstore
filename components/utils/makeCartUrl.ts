export const makeCartUrl = ({
  basePath,
  accessToken,
  orderId,
}: {
  basePath: string
  accessToken: string
  orderId: string
}) => {
  const url = new URL(`${basePath}/${orderId}`, window.location.href)
  url.searchParams.set("accessToken", accessToken)
  return url.toString()
}
