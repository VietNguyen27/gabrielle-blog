import React from 'react'
import Link from 'next/link'
import { getFormattedDate } from '@utils/utils'
import { Avatar } from '@components/Avatar'
import { TopicAnchor } from '@components/Topic'

type TCreator = {
  username: string
  profilePicture: string
}

type TCardProps = {
  _id: string
  creator: TCreator
  title: string
}

type TCardPrimaryProps = TCardProps & {
  createdAt: number
}

type TCardSecondaryProps = TCardProps & {
  createdAt: number
  readingTime: number
  topics: any
}

type TCardTertiaryProps = TCardProps & {
  topics: any
}

export const CardPrimary = ({
  _id,
  creator,
  title,
  createdAt,
}: TCardPrimaryProps) => {
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

export const CardSecondary = ({
  _id,
  creator,
  title,
  createdAt,
  readingTime,
  topics,
}: TCardSecondaryProps) => {
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

export const CardTertiary = ({
  _id,
  creator,
  title,
  topics,
}: TCardTertiaryProps) => {
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
