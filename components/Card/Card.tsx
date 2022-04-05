import React from 'react'
import Link from 'next/link'
import { getFormattedDate } from '@utils/utils'
import { Avatar } from '@components/Avatar'
import { TopicAnchor } from '@components/Topic'
import { TTopic } from '@global/types'

type TCreator = {
  email: string
  username: string
  profilePicture: string
}

type TCardProps = {
  _id: string
  creator: TCreator
  title: string
}

type TPostCardPrimaryProps = TCardProps & {
  createdAt: number
}

type TPostCardSecondaryProps = TCardProps & {
  createdAt: number
  readingTime: number
  topics: TTopic[]
}

type TPostCardTertiaryProps = TCardProps & {
  topics: TTopic[]
}

export const PostCardPrimary = ({
  _id,
  creator,
  title,
  createdAt,
}: TPostCardPrimaryProps) => {
  return (
    <article className="flex items-center gap-4">
      <Link href={`/${creator.username}`}>
        <a className="flex-shrink-0">
          <Avatar
            src={creator.profilePicture}
            alt={creator.username}
            className="w-12"
          />
        </a>
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/${creator.username}/post/${_id}`}>
          <a className="group">
            <h2 className="pb-1 text-xl font-bold group-hover:text-tertiary-500">
              {title}
            </h2>
            <div className="text-sm text-gray-600 group-hover:text-tertiary-500">
              {creator.username} - {getFormattedDate(createdAt)}
            </div>
          </a>
        </Link>
      </div>
    </article>
  )
}

export const PostCardSecondary = ({
  _id,
  creator,
  title,
  createdAt,
  readingTime,
  topics,
}: TPostCardSecondaryProps) => {
  return (
    <article className="flex gap-2 xs:gap-4">
      <Link href={`/${creator.username}`}>
        <a className="flex-shrink-0">
          <Avatar
            src={creator.profilePicture}
            alt={creator.username}
            className="w-8"
          />
        </a>
      </Link>
      <div className="flex flex-1 flex-col">
        <Link href={`/${creator.username}/post/${_id}`}>
          <a className="group">
            <h2 className="text-xl font-bold group-hover:text-tertiary-500">
              {title}
            </h2>
          </a>
        </Link>
        <div className="flex flex-wrap items-center text-sm text-gray-600 group-hover:text-tertiary-500">
          <Link href={`/${creator.username}`}>
            <a className="font-bold">{creator.username}</a>
          </Link>
          <span className="mx-1">-</span>
          <span>{getFormattedDate(createdAt)}</span>
          <span className="mx-2 h-1 w-1 rounded-full bg-gray-700"></span>
          <span>{readingTime} min read</span>
          <span className="mx-2 h-1 w-1 rounded-full bg-gray-700"></span>
          <div className="flex flex-wrap items-center gap-1">
            {topics.map((topic) => (
              <TopicAnchor key={topic.value} {...topic} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export const PostCardTertiary = ({
  _id,
  creator,
  title,
  topics,
}: TPostCardTertiaryProps) => {
  return (
    <Link href={`/${creator.username}/post/${String(_id)}`}>
      <a className="flex flex-col gap-1 p-4 transition-colors duration-200 hover:bg-gray-50">
        <p className="line-clamp-3">{title}</p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {topics.map((topic) => (
            <span key={topic._id} className="text-sm text-gray-500">
              #{topic.label.toLowerCase()}
            </span>
          ))}
        </div>
      </a>
    </Link>
  )
}

export const UserCard = ({ email, username, profilePicture }: TCreator) => {
  return (
    <div className="text-center">
      <div className="flex h-full flex-col items-center rounded-md border border-gray-200 bg-gray-50 py-4 px-2 shadow xs:px-4 xs:py-8">
        <Link href={`/${username}`}>
          <a>
            <Avatar
              className="w-12 xs:w-16"
              src={profilePicture}
              alt={username}
            />
          </a>
        </Link>
        <h2 className="pt-3 pb-1 text-lg line-clamp-2">
          <Link href={`/${username}`}>
            <a className="text-tertiary-900">{username}</a>
          </Link>
        </h2>
        <p className="line-clamp-2">{email}</p>
      </div>
    </div>
  )
}
