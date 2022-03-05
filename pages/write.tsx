import React from 'react'
import Head from 'next/head'
import { Header } from '@components/Layout'
import { Write } from '@page-components/Write'

const WritePage = () => {
  return (
    <>
      <Head>
        <title>Write new Post - Gabrielle Community</title>
      </Head>
      <Header />
      <Write />
    </>
  )
}

export default WritePage
