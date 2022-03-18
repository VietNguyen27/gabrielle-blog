import React from 'react'
import { Heading } from '@components/Heading'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@components/Button'

const NewPassword = () => {
  const { register } = useForm()

  return (
    <div className="rounded-md border border-gray-300 bg-white px-6 py-4 shadow">
      <Heading level={2} className="mb-8 text-lg">
        Set new password
      </Heading>
      <Form onSubmit={() => null}>
        <Input
          variant="secondary"
          type="password"
          label="Current password"
          className="mb-6"
          {...register('currentPassword')}
        />
        <Input
          variant="secondary"
          type="password"
          label="New password"
          className="mb-6"
          {...register('newPassword')}
        />
        <Input
          variant="secondary"
          type="password"
          label="Confirm new password"
          className="mb-6"
          {...register('confirmPassword')}
        />
        <Button
          type="submit"
          variant="tertiary"
          className="rounded-md px-4 py-2"
        >
          Set new password
        </Button>
      </Form>
    </div>
  )
}

export default NewPassword
