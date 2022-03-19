import React, { ReactElement } from 'react'
import Head from 'next/head'
import { middleware } from '@api-lib/middlewares'
import { GetServerSideProps } from 'next'
import { findUserByUsername } from '@api-lib/db'
import { extractUser } from '@lib/user'
import Profile from '@page-components/Profile'
import { Layout } from '@components/Layout'
import { findPosts } from '@api-lib/db/post'

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  await middleware.apply(context.req, context.res)

  const user = await findUserByUsername(context.req.db, context.params.username)
  const posts = await findPosts(context.req.db, user._id, null, null)

  if (!user) {
    return {
      notFound: true,
    }
  }

  user._id = String(user._id)
  return { props: { user: extractUser(user), posts } }
}

const ProfilePage = ({ user, posts }) => {
  return (
    <>
      <Head>
        <title>{user.username} - Gabrielle Community</title>
      </Head>
      <Profile posts={posts} {...user} />
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ProfilePage
