// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CommerceLayer, {
  CommerceLayerStatic,
  CommerceLayerClient,
  Organization,
} from "@commercelayer/sdk"
import retry from "async-retry"
import jwt_decode from "jwt-decode"
import type { NextApiRequest, NextApiResponse } from "next"

import hex2hsl, { BLACK_COLOR } from "components/utils/hex2hsl"

const RETRIES = 2

interface JWTProps {
  organization: {
    slug: string
    id: string
  }
  application: {
    kind: string
  }
  test: boolean
}

interface FetchResource<T> {
  object: T | undefined
  success: boolean
}

function isProduction(env: string): boolean {
  return env === "production"
}

async function retryCall<T>(
  f: Promise<T>
): Promise<FetchResource<T> | undefined> {
  return await retry(
    async (bail, number) => {
      try {
        const object = await f
        return {
          object: object as unknown as T,
          success: true,
        }
      } catch (e: unknown) {
        if (CommerceLayerStatic.isApiError(e) && e.status === 401) {
          console.log("Not authorized")
          bail(e)
          return
        }
        if (number === RETRIES + 1) {
          return {
            object: undefined,
            success: false,
          }
        }
        throw e
      }
    },
    {
      retries: RETRIES,
    }
  )
}

async function getOrganization(
  cl: CommerceLayerClient
): Promise<FetchResource<Organization> | undefined> {
  return retryCall<Organization>(
    cl.organization.retrieve({
      fields: {
        organizations: [
          "id",
          "logo_url",
          "name",
          "primary_color",
          "favicon_url",
        ],
      },
    })
  )
}

function getTokenInfo(accessToken: string) {
  try {
    const {
      organization: { slug },
      application: { kind },
      test,
    } = jwt_decode(accessToken) as JWTProps

    return { slug, kind, isTest: test }
  } catch (e) {
    console.log(`error decoding access token: ${e}`)
    return {}
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { NODE_ENV, DOMAIN, HOSTED } = process.env
  const accessToken = req.query.accessToken as string

  const domain = DOMAIN || "commercelayer.io"

  function invalidateCheckout(retry?: boolean) {
    res.statusCode = 200
    console.log("access token:")
    console.log(accessToken)
    return res.json({ valid: false, retryOnError: !!retry })
  }

  if (!accessToken) {
    return invalidateCheckout()
  }

  const subdomain = req.headers.host?.split(":")[0].split(".")[0]

  const { slug, kind, isTest } = getTokenInfo(accessToken)

  if (!slug) {
    return invalidateCheckout()
  }

  if (
    isProduction(NODE_ENV) &&
    !!HOSTED &&
    (subdomain !== slug || kind !== "sales_channel")
  ) {
    return invalidateCheckout()
  } else if (kind !== "sales_channel") {
    return invalidateCheckout()
  }

  const cl = CommerceLayer({
    organization: slug,
    accessToken: accessToken,
    domain,
  })

  const organizationResource = await getOrganization(cl)

  const organization = organizationResource?.object

  if (!organizationResource?.success || !organization?.id) {
    console.log("Invalid: organization")
    return invalidateCheckout(true)
  }
  const appSettings: Settings = {
    accessToken,
    endpoint: `https://${slug}.${domain}`,
    domain,
    slug,
    valid: true,
    logoUrl: organization.logo_url,
    companyName: organization.name || "Test company",
    primaryColor: hex2hsl(organization.primary_color as string) || BLACK_COLOR,
    favicon: organization.favicon_url || "/microstore/favicon.png",
  }

  return res
    .setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate")
    .status(200)
    .json(appSettings)
}
