import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'

type TLayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: TLayoutProps) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
