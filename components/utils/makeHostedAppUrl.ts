export const makeHostedAppUrl = ({
  basePath,
  accessToken,
  orderId,
}: {
  basePath: "cart" | "checkout"
  accessToken: string
  orderId: string
}) => {
  const url = new URL(`${basePath}/${orderId}`, window.location.href)
  url.searchParams.set("accessToken", accessToken)
  return url.toString()
}
