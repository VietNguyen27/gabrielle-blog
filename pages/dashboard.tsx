import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Dashboard } from '@page-components/Dashboard'

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Gabrielle Community</title>
      </Head>
      <Dashboard />
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default DashboardPage
