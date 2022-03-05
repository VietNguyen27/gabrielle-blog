import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Terms } from '@page-components/Terms'

const TermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions of Use - Gabrielle Community</title>
      </Head>
      <Terms />
    </>
  )
}

TermsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default TermsPage
