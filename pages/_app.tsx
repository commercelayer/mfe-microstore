import "../styles/globals.css"
import type { AppProps } from "next/app"

function MicrostoreApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MicrostoreApp
