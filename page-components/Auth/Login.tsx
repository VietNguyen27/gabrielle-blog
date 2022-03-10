import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { Header } from '@components/Layout'
import { EInputTypes, Input } from '@components/Input'
import { Checkbox } from '@components/Checkbox'
import { Button, EButtonRounded, EButtonTypes } from '@components/Button'
import { Form } from '@components/Form'
import { useFormContext } from 'react-hook-form'
import { fetcher } from '@lib/fetcher'
import { useCurrentUser } from '@lib/user'
import { getErrorFromJoiMessage } from '@utils/utils'
import { useError, useLoading } from '@lib/store'

const FormFields = () => {
  const { register } = useFormContext()
  const { error } = useError()

  return (
    <>
      <Input
        label="Email"
        className="mb-2"
        error={error['email']}
        {...register('email')}
      />
      <Input
        type={EInputTypes.PASSWORD}
        label="Password"
        className="mb-2"
        error={error['password']}
        {...register('password')}
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
    </>
  )
}

const Login = () => {
  const { data: { user } = {}, mutate } = useCurrentUser()
  const { loading, toggleLoading } = useLoading()
  const { setError, resetError } = useError()

  const onSubmit = useCallback(
    async (data) => {
      const { email, password } = data

      toggleLoading(true)
      try {
        const response = await fetcher('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
          }),
        })
        mutate({ user: response.user }, false)
        resetError()
      } catch (error: any) {
        if (error.length) {
          setError(getErrorFromJoiMessage(error))
        } else {
          setError({ password: 'Invalid email or password' })
        }
      } finally {
        toggleLoading(false)
      }
    },
    [mutate]
  )

  return (
    <>
      <Header />
      <main className="flex h-full items-center justify-center py-14 px-4">
        <div className="flex flex-col items-stretch pt-8 text-center">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="px-4 pt-2 pb-6">
            Sign in to get the most out of Gabrielle.
          </p>
          <Form
            className="flex flex-col items-stretch gap-4 pb-4"
            onSubmit={onSubmit}
          >
            <FormFields />
          </Form>
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
