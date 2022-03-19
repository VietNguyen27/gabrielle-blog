import Head from 'next/head'
import { middleware } from '@api-lib/middlewares'
import { findPostById, findPosts } from '@api-lib/db/post'
import { ReactElement } from 'react'
import { Layout } from '@components/Layout'
import { PostDetail } from '@page-components/PostDetail'

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res)

  const post = await findPostById(context.req.db, context.params.postId)
  const morePostsFromThisUser = await findPosts(
    context.req.db,
    post.creatorId,
    null,
    post._id,
    3,
    0
  )

  if (!post) {
    return {
      notFound: true,
    }
  }

  if (!morePostsFromThisUser.length) {
    const morePostsFromCommunity = await findPosts(
      context.req.db,
      null,
      null,
      post._id,
      3,
      0
    )
    return { props: { post, morePostsFromCommunity } }
  }

  return { props: { post, morePostsFromThisUser } }
}

const PostPage = ({ post, morePostsFromThisUser, morePostsFromCommunity }) => {
  return (
    <>
      <Head>
        <title>{post.title} - Gabrielle Community</title>
      </Head>
      <PostDetail
        morePostsFromThisUser={morePostsFromThisUser}
        morePostsFromCommunity={morePostsFromCommunity}
        {...post}
      />
    </>
  )
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default PostPage
