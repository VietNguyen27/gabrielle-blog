import React from 'react'
import {
  BookmarkIcon,
  ChatAlt2Icon,
  EyeIcon,
  HeartIcon,
  PencilIcon,
} from '@heroicons/react/outline'
import { ImageRatio } from '@components/ImageRatio'
import Link from 'next/link'
import { getFormattedDate, timeSince } from '@utils/utils'
import { TopicAnchor } from '@components/Topic'
import { Button } from '@components/Button'
import clsx from 'clsx'
import { Avatar } from '@components/Avatar'
import { UserPreview } from '@components/Preview'
import { useCurrentUser } from '@lib/user'
import { TTopic, TUser } from '@global/types'

type TPostCardProps = {
  _id: string
  title: string
  cover: string
  topics: TTopic[]
  creator: TUser
  likes: string[]
  likesCount: number
  commentsCount: number
  bookmarksCount: number
  bookmarks: string[]
  readingTime: number
  createdAt: number
  hasCover: boolean
  hasHeader: boolean
}

type TTrendingPostProps = {
  _id: string
  numOrder: number
  title: string
  creator: TUser
  readingTime: number
  createdAt: number
}

type TPostAnalysisCardProps = {
  _id: string
  title: string
  creator: TUser
  likesCount: number
  commentsCount: number
  bookmarksCount: number
  createdAt: number
  totalViews: number
}

export const PostCard = ({
  _id,
  title,
  cover,
  topics,
  creator,
  likes,
  likesCount,
  commentsCount,
  bookmarks,
  bookmarksCount,
  readingTime,
  createdAt,
  hasCover,
  hasHeader = true,
}: TPostCardProps) => {
  const { data: { user } = {} } = useCurrentUser()
  const isLiked = user && likes && likes.includes(user._id)
  const isBookmarked = user && bookmarks && bookmarks.includes(user._id)

  return (
    <article className="relative mb-4 rounded-md border border-gray-200 shadow-sm">
      <Link href={`/${creator.username}/post/${_id}`}>
        <a
          className="absolute top-0 left-0 h-full w-full"
          aria-label={title}
        ></a>
      </Link>
      {hasCover && (
        <ImageRatio className="z-negative" src={cover} ratio={2.5} />
      )}
      <div className="p-4">
        {hasHeader && (
          <div className="flex items-center pb-2">
            <UserPreview user={creator}>
              <Link href={`/${creator.username}`}>
                <a className="relative z-elevate">
                  <Avatar
                    src={creator.profilePicture}
                    alt={creator.username}
                    className="w-8"
                  />
                </a>
              </Link>
            </UserPreview>
            <div className="relative z-elevate flex flex-col pl-2">
              <Link href={`/${creator.username}`}>
                <a className="text-sm font-bold">{creator.username}</a>
              </Link>
              <span className="text-xs font-semibold">
                {getFormattedDate(createdAt)}
              </span>
            </div>
          </div>
        )}
        <div
          className={clsx(
            'flex flex-col items-stretch',
            hasHeader && 'xs:pl-10'
          )}
        >
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
                className="rounded-md px-2 py-1.5 text-center"
              >
                {isLiked ? (
                  <HeartIcon className="h-5 w-5 fill-red-700 text-red-700" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                {likesCount + bookmarksCount}{' '}
                {likesCount + bookmarksCount > 1 ? 'reactions' : 'reaction'}
              </Button>
              <Button
                as="a"
                href={`/${creator.username}/post/${_id}#comments`}
                variant="quinary"
                className="rounded-md px-2 py-1.5 text-center"
              >
                <ChatAlt2Icon className="h-5 w-5" />
                {commentsCount > 0 ? commentsCount : 'Add'}{' '}
                {commentsCount > 1 ? 'comments' : 'comment'}
              </Button>
            </div>
            <div className="relative z-elevate flex items-center gap-2 self-end xs:self-center">
              <span className="text-xs">{readingTime} min read</span>
              <Link href={`/${creator.username}/post/${_id}`}>
                <a className="cursor-pointer" aria-label={title}>
                  {isBookmarked ? (
                    <BookmarkIcon className="h-6 w-6 fill-indigo-500 text-indigo-500" />
                  ) : (
                    <BookmarkIcon className="h-6 w-6" />
                  )}
                </a>
              </Link>
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
      <div className="-mt-2 w-9 flex-shrink-0 whitespace-nowrap font-roboto text-3xl font-bold text-gray-300">
        {numOrder >= 10 ? numOrder : '0' + numOrder}
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-2 flex items-center gap-2">
          <UserPreview user={creator}>
            <Link href={`/${creator.username}`} passHref>
              <a>
                <Avatar
                  src={creator.profilePicture}
                  alt={creator.username}
                  className="w-6 flex-shrink-0"
                />
              </a>
            </Link>
          </UserPreview>
          <Link href={`/${creator.username}`}>
            <a className="text-sm font-semibold">{creator.username}</a>
          </Link>
        </div>
        <Link href={`/${creator.username}/post/${_id}`}>
          <a className="mb-2 font-roboto text-lg font-bold line-clamp-2">
            {title}
          </a>
        </Link>
        <div className="flex items-center text-sm">
          <span>{getFormattedDate(createdAt).slice(0, 6)}</span>
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-gray-700"></span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </article>
  )
}

export const PostAnalysisCard = ({
  _id,
  title,
  creator,
  likesCount,
  commentsCount,
  bookmarksCount,
  createdAt,
  totalViews,
}: TPostAnalysisCardProps) => {
  return (
    <article className="relative mb-4 border-b border-gray-200 pb-4">
      <div className="flex items-center">
        <div className="flex flex-col pr-4">
          <Link href={`/${creator.username}/post/${_id}`}>
            <a className="pb-1 text-lg font-bold text-tertiary-500 line-clamp-3 hover:text-tertiary-900">
              {title}
            </a>
          </Link>
          <div className="pb-2 text-sm">
            Created at: {getFormattedDate(createdAt)} ({timeSince(createdAt)})
          </div>
          <div className="flex flex-wrap items-center gap-y-2 text-gray-500">
            <span className="mr-4 inline-flex items-center">
              <HeartIcon className="mr-1.5 h-5 w-5" />
              {likesCount}
            </span>
            <span className="mr-4 inline-flex items-center">
              <ChatAlt2Icon className="mr-1.5 h-5 w-5" />
              {bookmarksCount}
            </span>
            <span className="mr-4 inline-flex items-center">
              <BookmarkIcon className="mr-1.5 h-5 w-5" />
              {commentsCount}
            </span>
            <span className="mr-4 inline-flex items-center">
              <EyeIcon className="mr-1.5 h-5 w-5" />
              {totalViews}
            </span>
          </div>
        </div>
        <Button
          variant="quinary"
          className="ml-auto flex-shrink-0 rounded-md px-2 py-1.5"
        >
          <PencilIcon className="mr-1 h-5 w-5" />
          Edit
        </Button>
      </div>
    </article>
  )
}
