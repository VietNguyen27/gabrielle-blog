import React, { ReactNode } from 'react'
import { BookmarkIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

type TAuthor = {
  displayName: string
  photoURL: any
  position: string
}

type TPostProps = {
  title: string
  subTitle: string
  coverImg: any
  tag: string
  author: TAuthor
  createdAt: string
}

type TTrendingPostProps = {
  numOrder: number
  title: string
  author: TAuthor
  createdAt: string
}

type TPostCover = {
  cover: any
  title: string
  className?: string
}

type TPostHeader = {
  tag: string
  createdAt: string
}

type TPostTitle = {
  children: ReactNode
  className?: string
}

type TPostDescription = {
  children: ReactNode
  className?: string
}

type TPostAuthor = {
  author: TAuthor
  title: string
}

const PostCover = ({ cover, title, className }: TPostCover) => {
  const defaultClassName = 'relative h-0 overflow-hidden rounded-lg'
  const allClassNames = clsx(defaultClassName, className)

  return (
    <div className={allClassNames}>
      <img
        className="absolute inset-0 h-full object-cover"
        src={cover.src}
        alt={title}
      />
    </div>
  )
}

const PostHeader = ({ tag, createdAt }: TPostHeader) => {
  return (
    <div className="mb-1 flex items-center">
      <span className="font-bold">{tag}</span>
      <span className="bg-text mx-2 h-1 w-1 rounded-full"></span>
      <span>{createdAt}</span>
    </div>
  )
}

const PostTitle = ({ children, className }: TPostTitle) => {
  const defaultClassName = 'font-bold line-clamp-3'
  const allClassNames = clsx(defaultClassName, className)

  return <h3 className={allClassNames}>{children}</h3>
}

const PostDescription = ({ children, className }: TPostDescription) => {
  const defaultClassName = 'mb-auto line-clamp-3'
  const allClassNames = clsx(defaultClassName, className)

  return <p className={allClassNames}>{children}</p>
}

const PostAuthor = ({ author, title }: TPostAuthor) => {
  return (
    <div className="flex items-center">
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <img
          className="absolute inset-0 h-full object-cover"
          src={author.photoURL.src}
          alt={title}
        />
      </div>
      <div className="ml-3 text-sm">
        <div className="text-heading font-semibold line-clamp-1">
          {author.displayName}
        </div>
        <div className="line-clamp-1">{author.position}</div>
      </div>
    </div>
  )
}

const PostWidget = () => {
  return (
    <div className="flex items-center">
      <button className="mr-2">
        <BookmarkIcon className="text-heading h-6 w-6" />
      </button>
      <button>
        <DotsHorizontalIcon className="text-heading h-6 w-6" />
      </button>
    </div>
  )
}

export const Post = ({
  title,
  subTitle,
  coverImg,
  tag,
  author,
  createdAt,
}: TPostProps) => {
  return (
    <article className="flex flex-col self-stretch">
      <PostCover cover={coverImg} title={title} className="mb-3 pb-[62.5%]" />
      <PostHeader tag={tag} createdAt={createdAt} />
      <PostTitle className="mb-2 text-2xl">{title}</PostTitle>
      <PostDescription className="text-base leading-6">
        {subTitle}
      </PostDescription>
      <div className="mt-4 flex items-center justify-between gap-4">
        <PostAuthor author={author} title={title} />
        <PostWidget />
      </div>
    </article>
  )
}

export const PostLarge = ({
  title,
  subTitle,
  coverImg,
  tag,
  author,
  createdAt,
}: TPostProps) => {
  return (
    <article className="flex flex-col items-stretch gap-10 md:flex-row">
      <div className="w-full md:w-2/3">
        <PostCover cover={coverImg} title={title} className="pb-[56.25%]" />
      </div>
      <div className="flex w-full flex-col md:w-1/3">
        <PostHeader tag={tag} createdAt={createdAt} />
        <PostTitle className="mb-4 text-3xl">{title}</PostTitle>
        <PostDescription className="text-lg leading-7">
          {subTitle}
        </PostDescription>
        <div className="mt-4 flex items-center justify-between gap-4">
          <PostAuthor author={author} title={title} />
          <PostWidget />
        </div>
      </div>
    </article>
  )
}

export const TrendingPost = ({
  numOrder,
  title,
  author,
  createdAt,
}: TTrendingPostProps) => {
  return (
    <article className="flex items-stretch gap-4">
      <div className="-mt-2 flex-shrink-0 text-3xl font-bold text-gray-200">
        {numOrder >= 10 ? numOrder : '0' + numOrder}
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-1 flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <img
              src={author.photoURL.src}
              alt={author.displayName}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold">{author.displayName}</span>
        </div>
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span>{createdAt}</span>
          <span className="inline-block h-1 w-1 rounded-full bg-gray-700"></span>
          <span>4 min read</span>
        </div>
      </div>
    </article>
  )
}
