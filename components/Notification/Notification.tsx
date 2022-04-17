import React from 'react'
import { TUser } from '@global/types'
import Link from 'next/link'
import { Avatar } from '@components/Avatar'
import { timeSince } from '@utils/utils'
import { UserPreview } from '@components/Preview'
import { PostCard } from '@components/Post'
import { LimitText } from '@components/LimitText'

type TNotificationProps = {
  reference: any
  title: string
  message: string
  type: string
  isRead: boolean
  sender: TUser
  createdAt: Date
}

const Notification = (props: TNotificationProps) => {
  const types = {
    comment: Comment,
    post: Post,
    follower: Follower,
  }
  const { type, isRead } = props
  const Component = types[type]

  return (
    <div className="relative mb-4 border-b border-gray-200 pb-4">
      <Component {...props} />
      {!isRead && (
        <span className="absolute top-0 right-2 h-3 w-3 rounded-full bg-tertiary-900"></span>
      )}
    </div>
  )
}

const Comment = ({
  sender,
  title,
  message,
  isRead,
  createdAt,
}: TNotificationProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <UserPreview user={sender}>
          <Link href={`/${sender.username}`}>
            <a>
              <Avatar
                src={sender.profilePicture}
                alt={sender.username}
                className="mr-4 w-8 bg-white xs:w-10"
              />
            </a>
          </Link>
        </UserPreview>
        <div className="flex flex-1 flex-col pr-8">
          <p>
            <Link href={`/${sender.username}`}>
              <a className="font-bold">{sender.username}</a>
            </Link>
            <span className="mx-1">{title}</span>
            <Link href="/#">
              <a className="font-bold">
                <LimitText text={message} limit={75} />
              </a>
            </Link>
          </p>
          <span className="text-sm text-gray-700">{timeSince(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

const Post = ({
  sender,
  title,
  message,
  reference,
  isRead,
  createdAt,
}: TNotificationProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <UserPreview user={sender}>
          <Link href={`/${sender.username}`}>
            <a>
              <Avatar
                src={sender.profilePicture}
                alt={sender.username}
                className="mr-4 w-8 bg-white xs:w-10"
              />
            </a>
          </Link>
        </UserPreview>
        <div className="flex flex-1 flex-col pr-8">
          <p>
            <Link href={`/${sender.username}`}>
              <a className="font-bold">{sender.username}</a>
            </Link>
            <span className="mx-1">{title}</span>
            {message && (
              <Link href="/#">
                <a className="font-bold">
                  <LimitText text={message} limit={75} />
                </a>
              </Link>
            )}
          </p>
          <span className="text-sm text-gray-700">{timeSince(createdAt)}</span>
        </div>
      </div>
      <div className="mt-2 xs:pl-14">
        {reference && (
          <PostCard hasHeader={false} creator={sender} {...reference} />
        )}
      </div>
    </div>
  )
}

const Follower = ({ sender, title, isRead, createdAt }: TNotificationProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <UserPreview user={sender}>
          <Link href={`/${sender.username}`}>
            <a>
              <Avatar
                src={sender.profilePicture}
                alt={sender.username}
                className="mr-4 w-8 bg-white xs:w-10"
              />
            </a>
          </Link>
        </UserPreview>
        <div className="flex flex-1 flex-col pr-8">
          <p>
            <Link href={`/${sender.username}`}>
              <a className="font-bold">{sender.username}</a>
            </Link>
            <span className="mx-1">{title}</span>
          </p>
          <span className="text-sm text-gray-700">{timeSince(createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default Notification
