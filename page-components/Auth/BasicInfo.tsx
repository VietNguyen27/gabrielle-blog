import React, { useState } from 'react'
import { Heading } from '@components/Heading'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@components/Button'
import { useCurrentUser } from '@lib/user'
import { ImageRatio } from '@components/ImageRatio'

const BasicInfo = () => {
  const { data: { user } = {} } = useCurrentUser()
  const [backdrop, setBackdrop] = useState(user.backdrop || '#333333')
  const { register } = useForm()

  const onChangeColor = (color) => {
    setBackdrop(color.hex)
  }

  return (
    <div className="rounded-md border border-gray-300 bg-white px-6 py-4 shadow">
      <Heading level={2} className="mb-8 text-lg">
        Basic info
      </Heading>
      <Form onSubmit={() => null}>
        <div className="mb-6 inline-flex items-center gap-4">
          <ImageRatio
            src={user.profilePicture}
            className="w-14 rounded-full border border-gray-200 shadow"
          />
          <Button
            as="label"
            variant="secondary"
            className="rounded-md px-2 py-1"
          >
            Change avatar
            <input type="file" className="hidden" accept="image/*" />
          </Button>
        </div>
        <Input
          variant="secondary"
          label="Username"
          className="mb-6"
          name="username"
          defaultValue={user.username}
          readOnly
        />
        <Input
          variant="secondary"
          label="Email"
          className="mb-6"
          name="email"
          defaultValue={user.email}
          readOnly
        />
        <Input
          variant="secondary"
          label="Location"
          className="mb-6"
          placeholder="Halifax, Nova Scotia"
          defaultValue={user.location}
          {...register('location')}
        />
        <Input
          variant="secondary"
          label="Bio"
          className="mb-6"
          placeholder="A short bio..."
          defaultValue={user.bio}
          {...register('bio')}
        />
        <Input
          variant="secondary"
          label="Skills/languages"
          className="mb-6"
          placeholder="Any languages, frameworks, etc. to highlight?"
          defaultValue={user.skills}
          {...register('skills')}
        />
        <Input
          type="color"
          label="Brand color"
          className="mb-6 w-1/2"
          name="backdrop"
          color={backdrop}
          onChangeColor={onChangeColor}
        />
        <Button
          type="submit"
          variant="tertiary"
          className="rounded-md px-4 py-2"
        >
          Save profile information
        </Button>
      </Form>
    </div>
  )
}

export default BasicInfo
