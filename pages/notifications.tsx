import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Notifications } from '@page-components/Notifications'

const NotificationsPage = () => {
  return (
    <>
      <Head>
        <title>Notifications - Gabrielle Community</title>
      </Head>
      <Notifications />
    </>
  )
}

NotificationsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NotificationsPage
