import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Topic } from '@page-components/Topics'
import { Layout } from '@components/Layout'
import { middleware } from '@api-lib/middlewares'
import { findTopicByName } from '@api-lib/db/topic'

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res)

  const topic = await findTopicByName(context.req.db, context.params.topic)

  if (!topic) {
    return {
      notFound: true,
    }
  }

  return { props: { topic } }
}

const TopicPage = ({ topic }) => {
  return (
    <>
      <Head>
        <title>{topic.label} - Gabrielle Community</title>
      </Head>
      <Topic topic={topic} />
    </>
  )
}

TopicPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default TopicPage
