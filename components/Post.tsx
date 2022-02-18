import React from 'react'
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

const Post = ({
  title,
  subTitle,
  coverImg,
  tag,
  author,
  createdAt,
}: TPostProps) => {
  return (
    <article className="flex flex-col self-stretch">
      <div className="relative mb-3 h-0 w-full overflow-hidden rounded-lg pb-[62.5%]">
        <img
          className="absolute inset-0 h-full object-cover"
          src={coverImg.src}
          alt={title}
        />
      </div>
      <div className="mb-1 flex items-center">
        <span className="font-bold">{tag}</span>
        <span className="mx-2 h-1 w-1 rounded-full bg-text"></span>
        <span>{createdAt}</span>
      </div>
      <h3 className="mb-2 text-2xl font-bold line-clamp-3">{title}</h3>
      <p className="mb-auto text-base leading-6 line-clamp-3">{subTitle}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
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
        <div className="flex items-center">
          <button className="mr-2">
            <BookmarkIcon className="h-6 w-6 text-heading" />
          </button>
          <button>
            <DotsHorizontalIcon className="h-6 w-6 text-heading" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default Post
