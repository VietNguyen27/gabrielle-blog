import React, { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useError, useMessage } from '@lib/store'
import { Message } from '@components/Message'

type TMainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: TMainLayoutProps) => {
  const router = useRouter()
  const { resetError } = useError()
  const {
    message: { message },
  } = useMessage()

  useEffect(() => {
    resetError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  useEffect(() => {
    if (message) {
      ;(document.querySelector('body') as any).classList.add(
        'overflow-hidden',
        'max-h-screen'
      )
    } else {
      ;(document.querySelector('body') as any).classList.remove(
        'overflow-hidden',
        'max-h-screen'
      )
    }
  }, [message])

  return (
    <>
      <Head>
        <title>Gabrielle Community</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>{children}</>
      <Message />
    </>
  )
}

export default MainLayout
