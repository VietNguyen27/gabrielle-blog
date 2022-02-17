import type { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '@components/Layout'

const Home = () => {
  return (
    <>
      <Head>
        <title>Gabrielle</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section></section>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
