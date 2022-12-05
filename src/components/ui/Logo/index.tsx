import { Image, Label } from "./styled"

interface Props {
  logoUrl?: string
  companyName: string
  className?: string
}

export function Logo({ logoUrl, companyName, className }: Props): JSX.Element {
  if (logoUrl) {
    return <Image src={logoUrl} alt={companyName} className={className} />
  }
  return <Label className={className}>{companyName}</Label>
}
