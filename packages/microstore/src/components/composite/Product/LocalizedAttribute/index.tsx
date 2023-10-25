import { SkuField } from "@commercelayer/react-components"
import { FC } from "react"

import { useDataFromUrl } from "#hooks/useDataFromUrl"

type LocalizedAttributeProp = "name" | "description"

export const LocalizedAttribute: FC<{
  attribute: LocalizedAttributeProp
}> = ({ attribute }) => {
  const { lang } = useDataFromUrl()
  return (
    <SkuField attribute="metadata">
      {/* @ts-expect-error Typings should be resolved by `react-components` */}
      {({ attributeValue }) => {
        const description =
          attributeValue[`microstore_i18n_${lang}_${attribute}`]
        return description ? (
          <p>{description}</p>
        ) : (
          <SkuField attribute={attribute} tagElement="p" />
        )
      }}
    </SkuField>
  )
}
