import React from 'react'
import Link from 'next/link'
import { Header } from '@components/Layout'
import { EInputTypes, Input } from '@components/Input'
import { Checkbox } from '@components/Checkbox'
import { Button, EButtonRounded, EButtonTypes } from '@components/Button'

const Login = () => {
  return (
    <>
      <Header />
      <main className="flex h-full items-center justify-center py-14 px-4">
        <div className="flex flex-col items-stretch pt-8 text-center">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="px-4 pt-2 pb-6">
            Sign in to get the most out of Gabrielle.
          </p>
          <form className="flex flex-col items-stretch gap-4 pb-4">
            <Input label="Email" className="mb-2" />
            <Input
              type={EInputTypes.PASSWORD}
              label="Password"
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
            Don't have an account?{' '}
            <Link href="/register">
              <a className="text-tertiary-900">Sign up</a>
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

export default Login
