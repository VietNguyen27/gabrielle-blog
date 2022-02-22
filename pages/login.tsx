import React from 'react'
import Header from '@components/Header'
import Head from 'next/head'
import Button, { EButtonRounded, EButtonTypes } from '@components/Button'
import Checkbox from '@components/Checkbox'
import Link from 'next/link'
import Input, { EInputTypes } from '@components/Input'

const Login = () => {
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
      <Header />
      <main className="flex h-full items-center justify-center py-14 px-4">
        <div className="flex flex-col items-stretch pt-8 text-center">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="px-4 pt-2 pb-6">
            Sign in to get the most out of Gabrielle.
          </p>
          <form className="flex flex-col items-stretch gap-4 pb-4">
            <Input placeholder="Email" className="mb-2" />
            <Input
              type={EInputTypes.PASSWORD}
              placeholder="Password"
              className="mb-2"
            />
            <div className="flex justify-between">
              <Checkbox label="Remember me" />
              <Link href="/#">
                <a className="text-sm text-gray-700">Forgot password?</a>
              </Link>
            </div>
            <Button type={EButtonTypes.SUBMIT} rounded={EButtonRounded.SMALL}>
              Login
            </Button>
          </form>
          <p>
            Don’t have an account?{' '}
            <Link href="/#">
              <a className="text-tertiary-900">Sign up</a>
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

export default Login
