import { getSalesChannelToken } from "@commercelayer/js-auth"
import { test as base } from "@playwright/test"
import dotenv from "dotenv"

import path from "path"

import { MicrostorePage } from "./MicrostorePage"

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") })

export interface DefaultParamsProps {
  accessToken?: string
  market?: string
  skuListId?: string
  cart?: boolean
  inline?: boolean
  all?: boolean
}

type FixtureType = {
  microstorePage: MicrostorePage
  defaultParams: DefaultParamsProps
}

const getToken = async (market?: string) => {
  const clientId = process.env.E2E_CLIENT_ID as string
  const endpoint = process.env.E2E_ENDPOINT as string
  const scope = market || (process.env.E2E_MARKET_ID as string)

  const data = await getSalesChannelToken({
    clientId,
    endpoint,
    scope,
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
