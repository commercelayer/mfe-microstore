import Head from "next/head"

interface Props {
  title: string
  favicon: string
}

export const MicrostoreHead: React.FC<Props> = (props) => {
  return (
    <Head>
      <title>Microstore - {props.title}</title>
      <link rel="icon" href={props.favicon} />
    </Head>
  )
}
