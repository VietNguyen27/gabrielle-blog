import React from 'react'
import Head from 'next/head'
import { Register } from '@page-components/Auth'

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up - Gabrielle Community</title>
      </Head>
      <Register />
    </>
  )
}

export default RegisterPage
