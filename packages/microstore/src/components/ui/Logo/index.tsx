interface Props {
  logoUrl?: string | null | undefined
  companyName: string
  className?: string
}

export function Logo({ logoUrl, companyName, className }: Props): JSX.Element {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={companyName}
        className={["w-60 max-w-full", className].join(" ")}
      />
    )
  }
  return (
    <h1
      className={[
        "font-extrabold uppercase tracking-wide text-xl text-black",
        className,
      ].join(" ")}
    >
      {companyName}
    </h1>
  )
}
