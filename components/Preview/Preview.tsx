import React, { ReactChild, ReactChildren, useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { getFormattedDate } from '@utils/utils'
import { useCurrentUser } from '@lib/user'
import { TUser } from '@global/types'
import useRect from '@hooks/useRect'
import { useModal } from '@hooks/useModal'
import { useAuth } from '@hooks/useAuth'
import { LoginRequired } from '@components/LoginRequired'

type TUserPreviewProps = {
  user: TUser
  children: ReactChild | ReactChildren
  className?: string
}

const Preview = ({ children, className }) => {
  return <div className={clsx('group relative', className)}>{children}</div>
}

const PreviewTrigger = ({ children }) => {
  return <>{children}</>
}

const PreviewCard = ({ children, isOverflow }) => {
  return (
    <div
      className={clsx(
        'absolute left-0 z-dropdown hidden overflow-hidden rounded bg-white shadow-lg outline outline-1 outline-gray-200 group-hover:block group-hover:delay-500',
        isOverflow ? 'bottom-full' : 'top-full'
      )}
    >
      {children}
    </div>
  )
}

export const UserPreview = ({
  user,
  children,
  className,
}: TUserPreviewProps) => {
  const [isOverflow, setIsOverflow] = useState(false)
  const { data: { currentUser } = {} } = useCurrentUser()
  const [rect, ref] = useRect()
  const { open, toggle } = useModal()
  const isAuth = useAuth()

  useEffect(() => {
    if (rect) {
      const offsetBottom =
        (window.innerHeight || document.documentElement.clientHeight) -
        rect?.top
      const isOverflow = offsetBottom < rect.height

      setIsOverflow(isOverflow)
    }
  }, [rect])

  const handleFollow = async () => {
    if (!isAuth) {
      toggle()
      return
    }
  }

  return (
    <LoginRequired open={open} toggle={toggle}>
      <Preview className={className}>
        <PreviewTrigger>{children}</PreviewTrigger>
        <PreviewCard isOverflow={isOverflow}>
          <div className="w-[360px]" ref={ref}>
            <div
              className="h-8"
              style={{ backgroundColor: user.backdrop }}
            ></div>
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
                <Button
                  variant="tertiary"
                  className="mb-4 rounded-md py-2"
                  onClick={handleFollow}
                  fluid
                >
                  Follow
                </Button>
              )}
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
    </LoginRequired>
  )
}
