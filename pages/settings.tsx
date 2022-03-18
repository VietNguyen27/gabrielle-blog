import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Settings } from '@page-components/Auth'

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Settings - Gabrielle Community</title>
      </Head>
      <Settings />
    </>
  )
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default SettingsPage
