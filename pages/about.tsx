import React, { ReactElement } from 'react'
import Head from 'next/head'
import About from '@page-components/About'
import { Layout } from '@components/Layout'

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About - Gabrielle Community</title>
      </Head>
      <About />
    </>
  )
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default AboutPage
