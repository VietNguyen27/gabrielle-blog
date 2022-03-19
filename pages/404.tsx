import Head from 'next/head'
import { Header } from '@components/Layout'
import { Custom404 } from '@page-components/Custom404'

const Custom404Page = () => {
  return (
    <>
      <Head>
        <title>404 Page not found - Gabrielle Community</title>
      </Head>
      <Header />
      <Custom404 />
    </>
  )
}

export default Custom404Page
