import { createContext, ReactNode, useEffect, useState } from "react"
import { z, ZodType } from "zod"

import { ErrorContainer } from "#components/composite/ErrorContainer"

type RuntimeConfigContextValue = RuntimeConfig

const RuntimeConfigContext = createContext<RuntimeConfigContextValue | null>(
  null
)

interface RuntimeConfigProviderProps {
  children: ((props: RuntimeConfigContextValue) => ReactNode) | ReactNode
}

export function RuntimeConfigProvider({
  children,
}: RuntimeConfigProviderProps): JSX.Element | null {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<RuntimeConfigContextValue | null>(null)

  useEffect(() => {
    const basePath =
      import.meta.env.PUBLIC_PROJECT_PATH != null
        ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
        : ""
    fetch(`${basePath}/config.json`)
      .then(async (r) => await r.json())
      .then((cfg) => {
        setValue(parseConfig(cfg))
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return null
  }

  if ((!isLoading && value == null) || value == null) {
    return (
      <ErrorContainer
        errorCode="Invalid configuration"
        errorMessage="It seems we could not find the required configuration for the current environment"
      />
    )
  }

  return (
    <RuntimeConfigContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </RuntimeConfigContext.Provider>
  )
}

function parseConfig(
  configFromJson: unknown
): RuntimeConfigContextValue | null {
  const configSchema: ZodType<RuntimeConfigContextValue> = z
    .object({
      domain: z.string().min(10),
      slug: z.optional(z.string().nullable()),
      isHosted: z.optional(z.boolean()),
    })
    .superRefine((data, ctx) => {
      if (data.isHosted !== true && !data.slug) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["slug"],
          message: "slug is required when isHosted is not true",
        })
      }
    })

  try {
    return configSchema.parse(configFromJson)
  } catch (cfgError) {
    console.error(cfgError)
    return null
  }
}
