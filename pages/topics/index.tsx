import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Topics } from '@page-components/Topics'
import { Layout } from '@components/Layout'

const TopicsPage = () => {
  return (
    <>
      <Head>
        <title>Topics - Gabrielle Community</title>
      </Head>
      <Topics />
    </>
  )
}

TopicsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default TopicsPage
