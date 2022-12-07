import { ReactNode } from "react"

import { Frame } from "./styled"

interface Props {
  children: ReactNode
}

export function Container({ children }: Props): JSX.Element {
  return <Frame>{children}</Frame>
}
