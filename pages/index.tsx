import Head from 'next/head'
import Home from '@page-components/Index'
import { Header } from '@components/Layout'
import { middleware } from '@api-lib/middlewares'
import { findPosts } from '@api-lib/db/post'

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res)

  const posts = await findPosts(context.req.db, null, null)

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return { props: { posts } }
}

const HomePage = ({ posts }) => {
  console.log(posts)
  return (
    <>
      <Head>
        <title>Gabrielle Community</title>
      </Head>
      <Header />
      <Home posts={posts} />
    </>
  )
}

export default HomePage
