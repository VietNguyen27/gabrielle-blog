import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Faqs } from '@page-components/Faqs'

const FaqsPage = () => {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions - Gabrielle Community</title>
      </Head>
      <Faqs />
    </>
  )
}

FaqsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default FaqsPage
