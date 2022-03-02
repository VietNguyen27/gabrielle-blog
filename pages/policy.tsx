import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Policy } from '@page-components/Terms'

const PolicyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy for Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Policy />
    </>
  )
}

PolicyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PolicyPage
