import Head from 'next/head'
import { Header } from '@components/Layout'
import { Custom500 } from '@page-components/Custom500'

const Custom500Page = () => {
  return (
    <>
      <Head>
        <title>500 Internal server error - Gabrielle Community</title>
      </Head>
      <Header />
      <Custom500 />
    </>
  )
}

export default Custom500Page
