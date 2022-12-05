import { Helmet } from "react-helmet-async"

interface Props {
  title: string
  favicon: string
}

export function MicrostoreHead(props: Props): JSX.Element {
  return (
    <Helmet>
      <title>Microstore - {props.title}</title>
      <link rel="icon" href={props.favicon} />
    </Helmet>
  )
}
