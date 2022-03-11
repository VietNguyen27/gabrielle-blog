import { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider, useCreateStore } from '@lib/store'
import '@styles/globals.css'
import { MainLayout } from '@components/Layout'
import { RouteGuard } from '@components/RouteGuard'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const createStore = useCreateStore(pageProps.initialZustandState)
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  return (
    <Provider createStore={createStore}>
      <MainLayout>
        <RouteGuard>{getLayout(<Component {...pageProps} />)}</RouteGuard>
      </MainLayout>
    </Provider>
  )
}

export default MyApp
