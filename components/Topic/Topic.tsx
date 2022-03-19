import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@components/Button'

type TTopicAnchorProps = {
  value: string
  label: string
  color: string
  className?: string
}

type TTopicCardProps = TTopicAnchorProps & {
  _id: string
  description: string
  postsPublished: number
}

export const TopicAnchor = ({
  value,
  label,
  color,
  className,
}: TTopicAnchorProps) => {
  const defaultClassName =
    'rounded-md border border-transparent px-1.5 py-1 text-gray-600 outline-none transition-colors duration-200'
  const allClassNames = clsx(defaultClassName, className)

  if (color) {
    return (
      <Link href={`/topics/${value.toLowerCase()}`}>
        <a
          className={clsx(
            allClassNames,
            'hover:border-topic-900 hover:bg-topic-100'
          )}
          style={{
            ['--topic-border' as any]: color,
            ['--topic-background' as any]: `${color}10`,
          }}
        >
          <span style={{ color }}>#</span>
          {label.toLowerCase()}
        </a>
      </Link>
    )
  }

  return (
    <Link href={`/topics/${value.toLowerCase()}`}>
      <a
        className={clsx(
          defaultClassName,
          'hover:border-gray-300 hover:bg-gray-100'
        )}
      >
        #{label.toLowerCase()}
      </a>
    </Link>
  )
}

export const TopicPopular = ({ value, label }) => {
  return (
    <li>
      <Link href={`/topics/${value}`}>
        <a className="text-md flex whitespace-nowrap rounded px-4 py-2 hover:bg-gray-100 hover:underline">
          #{label}
        </a>
      </Link>
    </li>
  )
}

export const TopicCard = ({
  value,
  label,
  description,
  color,
  postsPublished,
  className,
}: TTopicCardProps) => {
  const defaultClassName = 'w-1/2 md:w-1/3 px-1 sm:px-3 py-1 sm:py-2.5'
  const allClassNames = clsx(defaultClassName, className)

  return (
    <div className={allClassNames}>
      <div className="flex h-full flex-col items-stretch overflow-hidden rounded-md border border-gray-200 shadow">
        <div className="h-5" style={{ backgroundColor: color }}></div>
        <div className="p-3 sm:p-5">
          <TopicAnchor value={value} label={label} color={color} />
          <p className="mt-3 mb-1 line-clamp-2 sm:line-clamp-3">
            {description}
          </p>
          <p className="mb-4 text-sm text-gray-500">
            {postsPublished} posts published
          </p>
          <Button variant="primary" className="rounded-md px-4 py-2">
            Follow
          </Button>
        </div>
      </div>
    </div>
  )
}
