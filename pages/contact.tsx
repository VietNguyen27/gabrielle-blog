import React, { ReactElement } from 'react'
import Head from 'next/head'
import Contact from '@page-components/Contact'
import { Layout } from '@components/Layout'

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact - Gabrielle Community</title>
      </Head>
      <Contact />
    </>
  )
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ContactPage
