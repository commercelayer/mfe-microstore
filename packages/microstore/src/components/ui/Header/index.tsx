import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export function Header({ children }: Props): JSX.Element {
  return <div className="bg-white shadow-subtle p-8">{children}</div>
}
