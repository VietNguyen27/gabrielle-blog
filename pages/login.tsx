import React from 'react'
import Head from 'next/head'
import Login from '@page-components/Auth/Login'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Sign In Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}

export default LoginPage
