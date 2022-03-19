import { ALink } from '@components/ALink'
import { Container } from '@components/Layout'
import { useCurrentUser } from '@lib/user'
import React from 'react'
import BasicInfo from './BasicInfo'
import DeleteAccount from './DeleteAccount'
import NewPassword from './NewPassword'

const Settings = () => {
  const { data: { user } = {} } = useCurrentUser()

  return (
    <Container className="pt-4 pb-8">
      <div className="mx-auto flex flex-col items-stretch md:w-2/3 lg:w-1/2">
        <h1 className="pb-4 text-2xl font-bold">
          Settings for{' '}
          <ALink href={`/${user.username}`}>@{user.username}</ALink>
        </h1>
        <div className="flex flex-col items-stretch gap-6">
          <BasicInfo />
          <NewPassword />
          <DeleteAccount />
        </div>
      </div>
    </Container>
  )
}

export default Settings
