import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import "bootstrap/dist/css/bootstrap.min.css"

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return(
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydrateState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  ) 
}
