import Head from 'next/head'
import { Home } from '@page-components/Home'
import { Header } from '@components/Layout'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Gabrielle Community</title>
      </Head>
      <Header />
      <Home />
    </>
  )
}

export default HomePage
