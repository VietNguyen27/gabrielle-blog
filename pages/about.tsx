import React, { ReactElement } from 'react'
import Head from 'next/head'
import About from '@page-components/About'
import { Layout } from '@components/Layout'

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <About />
    </>
  )
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default AboutPage
