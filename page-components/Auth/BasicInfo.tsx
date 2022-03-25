import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Heading } from '@components/Heading'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { useFormContext } from 'react-hook-form'
import { Button } from '@components/Button'
import { saveUserToLocalStorage, useCurrentUser } from '@lib/user'
import { useError, useLoading, useMessage } from '@lib/store'
import { fetcher } from '@lib/fetcher'
import { getErrorFromJoiMessage } from '@utils/utils'
import { Avatar } from '@components/Avatar'

const FormFields = () => {
  const { data: { user } = {} } = useCurrentUser()
  const [backdrop, setBackdrop] = useState('')
  const { register, setValue } = useFormContext()
  const { error } = useError()
  const { loading } = useLoading()

  useEffect(() => {
    if (user) {
      setBackdrop(user.backdrop)
      setValue('backdrop', user.backdrop)
    }
  }, [user])

  const onChangeColor = (color) => {
    setBackdrop(color.hex)
    setValue('backdrop', color.hex)
  }

  return (
    <>
      <Input
        variant="secondary"
        label="Username"
        className="mb-6"
        name="username"
        {...(user && { defaultValue: user.username })}
        readOnly
      />
      <Input
        variant="secondary"
        label="Email"
        className="mb-6"
        name="email"
        {...(user && { defaultValue: user.email })}
        readOnly
      />
      <Input
        variant="secondary"
        label="Position"
        className="mb-6"
        placeholder="Developer, product manager, etc."
        maxLength={256}
        error={error['position']}
        {...(user && { defaultValue: user.position })}
        {...register('position')}
      />
      <Input
        variant="secondary"
        label="Location"
        className="mb-6"
        placeholder="Halifax, Nova Scotia"
        maxLength={256}
        error={error['location']}
        {...(user && { defaultValue: user.location })}
        {...register('location')}
      />
      <Input
        variant="secondary"
        label="Bio"
        className="mb-6"
        placeholder="A short bio..."
        maxLength={256}
        error={error['bio']}
        {...(user && { defaultValue: user.bio })}
        {...register('bio')}
      />
      <Input
        variant="secondary"
        label="Skills/languages"
        className="mb-6"
        placeholder="Any languages, frameworks, etc. to highlight?"
        maxLength={256}
        error={error['skills']}
        {...(user && { defaultValue: user.skills })}
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
        type={loading['updateUser'] ? 'button' : 'submit'}
        variant="tertiary"
        className="rounded-md px-4 py-2"
        loading={loading['updateUser']}
        loadingBackground="bg-tertiary-900"
      >
        Save profile information
      </Button>
    </>
  )
}

const BasicInfo = () => {
  const { data: { user } = {} } = useCurrentUser()
  const { setError, resetError } = useError()
  const { setLoading } = useLoading()
  const { setMessage } = useMessage()
  const [cover, setCover] = useState('')
  const profilePictureRef = useRef(null)

  const onProfilePictureChange = useCallback(
    (e) => {
      const file = e.currentTarget.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (file: any) => {
        setCover(file.currentTarget.result)
      }
      reader.readAsDataURL(file)
    },
    [cover]
  )

  const onSubmit = useCallback(async (data) => {
    const { position, location, bio, skills, backdrop } = data

    try {
      setLoading('updateUser', true)

      const formData = new FormData()

      formData.append('position', position || user.position)
      formData.append('location', location)
      formData.append('bio', bio)
      formData.append('skills', skills)
      formData.append('backdrop', backdrop)

      if ((profilePictureRef.current as any).files[0]) {
        formData.append(
          'profilePicture',
          (profilePictureRef.current as any).files[0]
        )
      }

      const { user: userUpdated } = await fetcher('/api/user', {
        method: 'PATCH',
        body: formData,
      })
      setMessage({
        message: 'Profile has been successfully updated.',
      })
      saveUserToLocalStorage(userUpdated)
      resetError()
    } catch (error: any) {
      setError(getErrorFromJoiMessage(error))
    } finally {
      setLoading('updateUser', false)
    }
  }, [])

  return (
    <div className="rounded-md border border-gray-300 bg-white px-6 py-4 shadow">
      <Heading level={2} className="mb-8 text-lg">
        Basic info
      </Heading>
      <Form onSubmit={onSubmit}>
        <div className="mb-6 inline-flex items-center gap-4">
          {user ? (
            <Avatar
              src={cover || user.profilePicture}
              alt={user.username}
              className="w-14"
            />
          ) : (
            <div className="h-14 w-14 animate-pulse rounded-full bg-gray-200"></div>
          )}
          <Button
            as="label"
            variant="secondary"
            className="rounded-md px-2 py-1"
          >
            Change avatar
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={profilePictureRef}
              onChange={onProfilePictureChange}
            />
          </Button>
        </div>
        <FormFields />
      </Form>
    </div>
  )
}

export default BasicInfo
