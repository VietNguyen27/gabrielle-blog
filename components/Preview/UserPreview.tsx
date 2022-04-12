import React, { ReactChild, ReactChildren, useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { getFormattedDate } from '@utils/utils'
import { useCurrentUser } from '@lib/user'
import { TUser } from '@global/types'
import { useRect, useModal, useAuth } from '@hooks/index'
import { LoginRequired } from '@components/LoginRequired'
import { useFollowers } from '@lib/followers'
import { fetcher } from '@lib/fetcher'
import { Preview, PreviewCard, PreviewTrigger } from './Preview'

type TUserPreviewProps = {
  user: TUser
  children: ReactChild | ReactChildren
  className?: string
}

const UserPreview = ({ user, children, className }: TUserPreviewProps) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false)
  const { data: { user: currentUser } = {} } = useCurrentUser()
  const { data: { followers } = {}, mutate } = useFollowers(user._id)
  const [rect, ref] = useRect()
  const { open, toggle } = useModal()
  const isAuth = useAuth()
  const isFollowed =
    currentUser &&
    followers &&
    followers.some(({ followerId }) => followerId === currentUser._id)

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

    await fetcher(`/api/user/${user._id}/follow`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followedId: user._id,
      }),
    })
    mutate()
  }

  const handleUnfollow = async () => {
    await fetcher(`/api/user/${user._id}/follow`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followedId: user._id,
      }),
    })
    mutate()
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
                <>
                  {user && followers && isFollowed ? (
                    <Button
                      variant="secondary"
                      className="mb-4 rounded-md py-2"
                      onClick={handleUnfollow}
                      fluid
                    >
                      Following
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
                </>
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

export default UserPreview
