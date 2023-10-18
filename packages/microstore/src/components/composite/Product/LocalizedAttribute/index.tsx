import { SkuField } from "@commercelayer/react-components"
import { FC } from "react"

import { useDataFromUrl } from "#hooks/useDataFromUrl"

export const LocalizedAttribute: FC<{ attribute: "name" | "description" }> = ({
  attribute,
}) => {
  const { lang } = useDataFromUrl()
  return (
    <SkuField attribute="metadata">
      {/* @ts-expect-error Typings should be resolved by `react-components` */}
      {({ attributeValue }) => {
        const description = attributeValue[`${attribute}_${lang}`]
        return description ? (
          <p>{description}</p>
        ) : (
          <SkuField attribute={attribute} tagElement="p" />
        )
      }}
    </SkuField>
  )
}
