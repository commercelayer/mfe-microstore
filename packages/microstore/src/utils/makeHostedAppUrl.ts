type MakeHostedCartUrlConfig = {
  hostedApp: "cart"
  accessToken: string
  orderId: string
}

type MakeHostedCheckoutUrlConfig = {
  hostedApp: "checkout"
  accessToken: string
  orderId: string
  subdomain: string
}

type MakeHostedAppUrlConfig =
  | MakeHostedCartUrlConfig
  | MakeHostedCheckoutUrlConfig

export const makeHostedAppUrl = (options: MakeHostedAppUrlConfig) => {
  const { hostedApp, accessToken, orderId } = options

  const url =
    hostedApp === "checkout"
      ? makeCheckoutUrl({ orderId, subdomain: options.subdomain })
      : makeCartUrl({ orderId })

  url.searchParams.set("accessToken", accessToken)
  return url.toString()
}

const makeCheckoutUrl = ({
  subdomain,
  orderId,
}: {
  subdomain: string
  orderId: string
}): URL =>
  new URL(
    `${orderId}`,
    `https://${subdomain}.commercelayer.app/checkout/${orderId}`
  )

const makeCartUrl = ({ orderId }: { orderId: string }): URL =>
  new URL(`cart/${orderId}`, window.location.origin)
