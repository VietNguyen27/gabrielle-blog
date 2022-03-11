import React, { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useError } from '@lib/store'

type TMainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: TMainLayoutProps) => {
  const router = useRouter()
  const { resetError } = useError()

  useEffect(() => {
    resetError()
  }, [router.asPath])

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>{children}</>
    </>
  )
}

export default MainLayout
