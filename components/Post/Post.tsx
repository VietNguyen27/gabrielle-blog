import React from 'react'
import { BookmarkIcon, ChatAlt2Icon, HeartIcon } from '@heroicons/react/outline'
import { ImageRatio } from '@components/ImageRatio'
import Link from 'next/link'
import { getFormattedDate } from '@utils/utils'
import { TopicAnchor } from '@components/Topic'
import { Button } from '@components/Button'
import clsx from 'clsx'

type TCreator = {
  username: string
  profilePicture: string
}

type TTopic = {
  value: string
  label: string
  color: string
}

type TPostCardProps = {
  _id: string
  title: string
  cover: string
  topics: TTopic[]
  creator: TCreator
  likesCount: number
  commentsCount: number
  readingTime: number
  createdAt: number
  hasCover: boolean
}

type TTrendingPostProps = {
  _id: string
  numOrder: number
  title: string
  creator: TCreator
  readingTime: number
  createdAt: number
}

export const PostCard = ({
  _id,
  title,
  cover,
  topics,
  creator,
  likesCount,
  commentsCount,
  readingTime,
  createdAt,
  hasCover,
}: TPostCardProps) => {
  return (
    <article className="relative mb-4 overflow-hidden rounded-md border border-gray-200 shadow-sm">
      <Link href={`/${creator.username}/post/${_id}`}>
        <a className="absolute top-0 left-0 h-full w-full"></a>
      </Link>
      {hasCover && (
        <ImageRatio className="z-negative" src={cover} ratio={2.5} />
      )}
      <div className="p-4">
        <div className="flex items-center pb-2">
          <Link href={`/${creator.username}`}>
            <a className="relative z-elevate">
              <ImageRatio
                src={creator.profilePicture}
                className="w-8 rounded-full"
              />
            </a>
          </Link>
          <div className="relative z-elevate flex flex-col pl-2">
            <Link href={`/${creator.username}`}>
              <a className="text-sm font-bold">{creator.username}</a>
            </Link>
            <span className="text-xs font-semibold">
              {getFormattedDate(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-stretch xs:pl-10">
          <h2
            className={clsx(
              'pb-2 font-bold line-clamp-3',
              hasCover ? 'text-3xl' : 'text-2xl'
            )}
          >
            {title}
          </h2>
          <div className="relative z-elevate -ml-2 flex flex-wrap gap-1 pb-2">
            {topics.map((topic) => (
              <TopicAnchor key={topic.value} {...topic} />
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-y-2 xs:flex-row xs:items-center">
            <div className="relative z-elevate flex items-center gap-2">
              <Button
                as="a"
                href={`/${creator.username}/post/${_id}`}
                variant="quinary"
                className="rounded-md px-2 py-1.5"
              >
                <HeartIcon className="mr-1 h-5 w-5" />
                {likesCount} reactions
              </Button>
              <Button
                as="a"
                href={`/${creator.username}/post/${_id}`}
                variant="quinary"
                className="rounded-md px-2 py-1.5"
              >
                <ChatAlt2Icon className="mr-1 h-5 w-5" />
                {commentsCount > 0 ? commentsCount : 'Add'} comment
              </Button>
            </div>
            <div className="relative z-elevate flex items-center gap-2 self-end">
              <span className="text-xs">{readingTime} min read</span>
              <button>
                <BookmarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export const TrendingPost = ({
  _id,
  numOrder,
  title,
  creator,
  readingTime,
  createdAt,
}: TTrendingPostProps) => {
  return (
    <article className="flex items-stretch gap-4">
      <div className="-mt-2 w-9 flex-shrink-0 whitespace-nowrap text-3xl font-bold text-gray-200">
        {numOrder >= 10 ? numOrder : '0' + numOrder}
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-2 flex items-center gap-2">
          <Link href={`/${creator.username}`} passHref>
            <a>
              <ImageRatio
                src={creator.profilePicture}
                alt={creator.username}
                className="w-6 flex-shrink-0 rounded-full"
              />
            </a>
          </Link>
          <Link href={`/${creator.username}`}>
            <a className="text-sm font-semibold">{creator.username}</a>
          </Link>
        </div>
        <Link href={`/${creator.username}/post/${_id}`}>
          <a className="mb-2 font-roboto text-lg font-bold line-clamp-2">
            {title}
          </a>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span>{getFormattedDate(createdAt)}</span>
          <span className="inline-block h-1 w-1 rounded-full bg-gray-700"></span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </article>
  )
}
