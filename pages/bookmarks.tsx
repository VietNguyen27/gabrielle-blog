import React, { ReactElement } from 'react'
import Head from 'next/head'
import { Layout } from '@components/Layout'
import { Bookmarks } from '@page-components/Bookmarks'

const BookmarksPage = () => {
  return (
    <>
      <Head>
        <title>Bookmarks - Gabrielle Community</title>
      </Head>
      <Bookmarks />
    </>
  )
}

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default BookmarksPage
