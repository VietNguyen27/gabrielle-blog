import React, { ReactChild, ReactChildren } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { getFormattedDate } from '@utils/utils'
import { useCurrentUser } from '@lib/user'

type TUserPreviewProps = {
  user: any
  children: ReactChild | ReactChildren
  className?: string
}

const Preview = ({ children, className }) => {
  return <div className={clsx('group relative', className)}>{children}</div>
}

const PreviewTrigger = ({ children }) => {
  return <>{children}</>
}

const PreviewCard = ({ children }) => {
  return (
    <div className="invisible absolute top-full left-0 z-dropdown overflow-hidden rounded bg-white opacity-0 shadow-lg outline outline-1 outline-gray-200 group-hover:visible group-hover:opacity-100 group-hover:delay-500">
      {children}
    </div>
  )
}

export const UserPreview = ({
  user,
  children,
  className,
}: TUserPreviewProps) => {
  const { data: { currentUser } = {} } = useCurrentUser()

  return (
    <Preview className={className}>
      <PreviewTrigger>{children}</PreviewTrigger>
      <PreviewCard>
        <div className="w-[360px]">
          <div className="h-8" style={{ backgroundColor: user.backdrop }}></div>
          <div className="-mb-8 -translate-y-8 p-4">
            <div className="relative flex items-end gap-2 pb-6">
              <Link href={`/${user.username}`}>
                <a>
                  <Avatar
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-12 bg-white"
                  />
                </a>
              </Link>
              <Link href={`/${user.username}`}>
                <a className="text-xl font-bold line-clamp-1">
                  {user.username}
                </a>
              </Link>
            </div>
            {currentUser && currentUser.username === user.username ? (
              <Button
                variant="secondary"
                as="a"
                href="/settings"
                className="mb-4 rounded-md py-2"
                fluid
              >
                Edit profile
              </Button>
            ) : (
              <Button variant="tertiary" className="mb-4 rounded-md py-2" fluid>
                Follow
              </Button>
            )}
            {user.bio && <div className="mb-4 line-clamp-3">{user.bio}</div>}
            <div className="text-sm font-bold uppercase">Email</div>
            <div className="mb-2">{user.email}</div>
            <div className="text-sm font-bold uppercase">Work</div>
            <div className="mb-2">{user.position}</div>
            {user.location && (
              <>
                <div className="text-sm font-bold uppercase">Location</div>
                <div className="mb-2">{user.location}</div>
              </>
            )}
            <div className="text-sm font-bold uppercase">Joined</div>
            <div className="mb-2">{getFormattedDate(user.createdAt)}</div>
          </div>
        </div>
      </PreviewCard>
    </Preview>
  )
}
