import { ReactElement } from 'react'
import Head from 'next/head'
import Home from '@page-components/Index'
import { Layout } from '@components/Layout'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Gabrielle Community</title>
      </Head>
      <Home />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HomePage
