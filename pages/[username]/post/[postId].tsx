import Head from 'next/head'
import { middleware } from '@api-lib/middlewares'
import { findPostById } from '@api-lib/db/post'
import { ReactElement } from 'react'
import { Layout } from '@components/Layout'
import { PostDetail } from '@page-components/PostDetail'

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res)

  const post = await findPostById(context.req.db, context.params.postId)
  if (!post) {
    return {
      notFound: true,
    }
  }

  return { props: { post } }
}

const PostPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} - Gabrielle Community</title>
      </Head>
      <PostDetail {...post} />
    </>
  )
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PostPage
