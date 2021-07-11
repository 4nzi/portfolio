import { AppProps } from 'next/app'
import GlobalStyle from '../components/GlobalStyle'
import { Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedPosts}>
        <Provider>
          <Component {...pageProps} />
          <GlobalStyle />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}
export default MyApp
