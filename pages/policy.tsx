import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Policy } from '@page-components/Terms'

const PolicyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Gabrielle Community</title>
      </Head>
      <Policy />
    </>
  )
}

PolicyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PolicyPage
