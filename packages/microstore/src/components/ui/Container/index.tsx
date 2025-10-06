import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function Container({ children }: Props): JSX.Element {
  return <div className="container">{children}</div>
}
