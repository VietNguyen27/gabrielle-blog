import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export const TopicAnchor = ({ value, label, color }) => {
  const defaultClassName =
    'rounded-md border border-transparent px-1.5 py-1 text-gray-600 outline-none transition-colors duration-200'

  if (color) {
    return (
      <Link href={`/topic/${value.toLowerCase()}`}>
        <a
          className={clsx(
            defaultClassName,
            'hover:bg-topic-100 hover:border-topic-900'
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
    <Link href={`/topic/${value.toLowerCase()}`}>
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
