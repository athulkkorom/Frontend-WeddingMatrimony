import '@/styles/globals.css'
import {  ChainId,ThirdwebProvider} from '@thirdweb-dev/react'

export default function App({ Component, pageProps }) {
const active = ChainId.Mumbai

  return (
    <ThirdwebProvider activeChain={active} autoConnect >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
