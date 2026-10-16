import { authenticate } from "@commercelayer/js-auth"
import { test as base } from "@playwright/test"
import { ENV } from "varlock/env"

import { MicrostorePage } from "./MicrostorePage"

export interface DefaultParamsProps {
  accessToken?: string
  market?: string
  skuListId?: string
  cart?: boolean
  inline?: boolean
  all?: boolean
  linkId?: string
}

type FixtureType = {
  microstorePage: MicrostorePage
  defaultParams: DefaultParamsProps
}

const getToken = async (market?: string) => {
  const clientId = ENV.E2E_CLIENT_ID
  const scope = market || ENV.E2E_MARKET_ID

  const data = await authenticate("client_credentials", {
    clientId,
    scope,
    domain: ENV.E2E_DOMAIN,
  })

  return data?.accessToken as string
}

export const test = base.extend<FixtureType>({
  defaultParams: {},
  microstorePage: async ({ page, defaultParams }, use) => {
    const token = await getToken(defaultParams.market)
    const microstorePage = new MicrostorePage(page)

    const accessToken =
      defaultParams.accessToken === undefined
        ? token
        : defaultParams.accessToken

    await microstorePage.goto({
      accessToken,
      ...defaultParams,
    })
    await use(microstorePage)
  },
})

export { expect } from "@playwright/test"
