import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function Base({ children }: Props): JSX.Element {
  return <div className="bg-gray-50 min-h-screen w-auto">{children}</div>
}
