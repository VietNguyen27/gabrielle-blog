import React from 'react'
import Link from 'next/link'
import { ImageRatio } from '@components/ImageRatio'
import { getFormattedDate } from '@utils/utils'

type TCreator = {
  username: string
  profilePicture: string
}

type TCardPrimaryProps = {
  _id: string
  creator: TCreator
  title: string
  createdAt: number
}

type TCardSecondaryProps = {
  _id: string
  creator: TCreator
  title: string
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
          <ImageRatio
            src={creator.profilePicture}
            className="w-12 rounded-full border border-gray-200"
          />
        </a>
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/${creator.username}/post/${_id}`}>
          <a className="group">
            <h2 className="pb-1 text-xl font-bold group-hover:text-tertiary-500">
              {title}
            </h2>
            <p className="text-sm text-gray-600 group-hover:text-tertiary-500">
              {creator.username} - {getFormattedDate(createdAt)}
            </p>
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
  topics,
}: TCardSecondaryProps) => {
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
