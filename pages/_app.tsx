import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css"

import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return(
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydrateState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools  position='bottom-right' />
    </QueryClientProvider>
  ) 
}
