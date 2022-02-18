import React, { ReactNode } from 'react'
import clsx from 'clsx'
import { BookmarkIcon, DotsHorizontalIcon } from '@heroicons/react/outline'

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

export const PostCover = ({ cover, title, className }: TPostCover) => {
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

export const PostHeader = ({ tag, createdAt }: TPostHeader) => {
  return (
    <div className="mb-1 flex items-center">
      <span className="font-bold">{tag}</span>
      <span className="mx-2 h-1 w-1 rounded-full bg-text"></span>
      <span>{createdAt}</span>
    </div>
  )
}

export const PostTitle = ({ children, className }: TPostTitle) => {
  const defaultClassName = 'font-bold line-clamp-3'
  const allClassNames = clsx(defaultClassName, className)

  return <h3 className={allClassNames}>{children}</h3>
}

export const PostDescription = ({ children, className }: TPostDescription) => {
  const defaultClassName = 'mb-auto'
  const allClassNames = clsx(defaultClassName, className)

  return <p className={allClassNames}>{children}</p>
}

export const PostAuthor = ({ author, title }: TPostAuthor) => {
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
        <div className="font-semibold text-heading line-clamp-1">
          {author.displayName}
        </div>
        <div className="line-clamp-1">{author.position}</div>
      </div>
    </div>
  )
}

export const PostWidget = () => {
  return (
    <div className="flex items-center">
      <button className="mr-2">
        <BookmarkIcon className="h-6 w-6 text-heading" />
      </button>
      <button>
        <DotsHorizontalIcon className="h-6 w-6 text-heading" />
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
      <PostDescription className="text-base leading-6 line-clamp-3">
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
    <article className="flex items-stretch gap-10">
      <div className="w-2/3">
        <PostCover
          cover={coverImg}
          title={title}
          className="mb-3 pb-[56.25%]"
        />
      </div>
      <div className="flex w-1/3 flex-col">
        <PostHeader tag={tag} createdAt={createdAt} />
        <PostTitle className="mb-4 text-3xl">{title}</PostTitle>
        <PostDescription className="text-lg leading-7 line-clamp-4">
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
