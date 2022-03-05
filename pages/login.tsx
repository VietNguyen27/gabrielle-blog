import React from 'react'
import Head from 'next/head'
import Login from '@page-components/Auth/Login'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Sign In - Gabrielle Community</title>
      </Head>
      <Login />
    </>
  )
}

export default LoginPage
