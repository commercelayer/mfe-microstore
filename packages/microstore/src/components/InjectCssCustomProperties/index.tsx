import { type FC, useEffect } from "react"
import { type HSL, hexToHSL } from "./hex2hsl"

type PropertySet = [string, string | number]

interface Props {
  primaryColor: string // hex
}

const InjectCssCustomProperties: FC<Props> = ({ primaryColor }) => {
  useEffect(() => {
    const hsl = hexToHSL(primaryColor)
    if (hsl != null) {
      const allValues = makeAllPropertiesList(hsl)
      setCssProperties(allValues)
      // setInRoot(allValues)
    }
  }, [primaryColor])

  return null
}

const makeAllPropertiesList = (hsl: HSL): PropertySet[] => [
  ["--primary-h", hsl.h],
  ["--primary-s", hsl.s],
  ["--primary-l", hsl.l],
  ["--primary", "hsl(var(--primary-h), var(--primary-s), var(--primary-l))"],
  [
    "--primary-light",
    "hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)",
  ],
  [
    "--primary-dark",
    "hsl(var(--primary-h), var(--primary-s), calc(var(--primary-l) * 0.5))",
  ],
  ["--contrast-threshold", "75%"],
  ["--switch", "calc((var(--primary-l) - var(--contrast-threshold)) * -10000)"],
  ["--contrast", "hsl(0, 0%, var(--switch))"],
]

const setCssProperties = (values: PropertySet[]): void => {
  if (document?.documentElement == null) {
    return
  }

  for (const [name, value] of values) {
    document.documentElement.style.setProperty(
      name,
      value != null ? `${value}` : null,
    )
  }
}

InjectCssCustomProperties.displayName = "InjectCssCustomProperties"
export { InjectCssCustomProperties }
