import React, { ReactNode } from 'react'
import clsx from 'clsx'

type TListTypes = 'ol' | 'ul'

type TListProps = {
  type?: TListTypes
  children: ReactNode
  className?: string
}

type TListItemProps = {
  children: ReactNode
}

export const List = ({ type = 'ul', children, className }: TListProps) => {
  const defaultClassName = 'mb-4 pl-8'
  const allClassNames = clsx(
    defaultClassName,
    className,
    type === 'ul' ? 'list-decimal' : 'list-disc'
  )

  return React.createElement(type, { className: allClassNames }, children)
}

export const ListItem = ({ children }: TListItemProps) => {
  return <li className="mb-2">{children}</li>
}
