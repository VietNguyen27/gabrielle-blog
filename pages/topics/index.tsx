import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Topics } from '@page-components/Topics'
import { Layout } from '@components/Layout'
import { middleware } from '@api-lib/middlewares'
import { findTopics } from '@api-lib/db/topic'

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res)

  const topics = await findTopics(context.req.db)

  if (!topics) {
    return {
      notFound: true,
    }
  }

  return { props: { topics } }
}

const TopicsPage = ({ topics }) => {
  return (
    <>
      <Head>
        <title>Topics - Gabrielle Community</title>
      </Head>
      <Topics topics={topics} />
    </>
  )
}

TopicsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default TopicsPage
