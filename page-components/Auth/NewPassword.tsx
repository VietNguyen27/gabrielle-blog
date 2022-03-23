import React, { useCallback, useEffect } from 'react'
import { Heading } from '@components/Heading'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { useFormContext } from 'react-hook-form'
import { Button } from '@components/Button'
import { useError, useLoading, useMessage } from '@lib/store'
import { fetcher } from '@lib/fetcher'
import { getErrorFromJoiMessage } from '@utils/utils'
import { removeUserToLocalStorage, useCurrentUser } from '@lib/user'

const FormFields = () => {
  const { register } = useFormContext()
  const { error } = useError()
  const { loading } = useLoading()

  return (
    <>
      <Input
        variant="secondary"
        type="password"
        label="Current password"
        className="mb-6"
        error={error['oldPassword']}
        {...register('oldPassword')}
      />
      <Input
        variant="secondary"
        type="password"
        label="New password"
        className="mb-6"
        error={error['newPassword']}
        {...register('newPassword')}
      />
      <Input
        variant="secondary"
        type="password"
        label="Confirm new password"
        className="mb-6"
        error={error['confirmPassword']}
        {...register('confirmPassword')}
      />
      <Button
        type={loading['newPassword'] ? 'button' : 'submit'}
        variant="tertiary"
        className="rounded-md px-4 py-2"
        loading={loading['newPassword']}
        loadingBackground="bg-tertiary-900"
      >
        Set new password
      </Button>
    </>
  )
}

const NewPassword = () => {
  const { setError, resetError } = useError()
  const { setLoading } = useLoading()
  const { setMessage } = useMessage()
  const { mutate } = useCurrentUser()

  const onSubmit = useCallback(async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data

    try {
      setLoading('newPassword', true)

      await fetcher('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      })
      setMessage({
        message: 'Password has been successfully updated.',
      })
      resetError()
      onLogOut()
    } catch (error: any) {
      setError(getErrorFromJoiMessage(error))
    } finally {
      setLoading('newPassword', false)
    }
  }, [])

  const onLogOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      })
      removeUserToLocalStorage()
      mutate({ user: null })
    } catch (error) {
      console.log(error)
    }
  }, [mutate])

  return (
    <div className="rounded-md border border-gray-300 bg-white px-6 py-4 shadow">
      <Heading level={2} className="mb-8 text-lg">
        Set new password
      </Heading>
      <Form onSubmit={onSubmit}>
        <FormFields />
      </Form>
    </div>
  )
}

export default NewPassword
