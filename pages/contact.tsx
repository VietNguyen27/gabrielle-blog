import React, { ReactElement } from 'react'
import Head from 'next/head'
import Contact from '@page-components/Contact'
import { Layout } from '@components/Layout'

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Contact />
    </>
  )
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ContactPage
