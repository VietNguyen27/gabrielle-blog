import React, { ReactNode } from 'react'
import clsx from 'clsx'

export enum EListType {
  ORDERED = 'o',
  UNORDERED = 'u',
}

type TListProps = {
  type?: EListType
  children: ReactNode
  className?: string
}

type TListItemProps = {
  children: ReactNode
}

export const List = ({
  type = EListType.UNORDERED,
  children,
  className,
}: TListProps) => {
  const defaultClassName = 'mb-4 pl-8'
  const allClassNames = clsx(
    defaultClassName,
    className,
    type === EListType.ORDERED ? 'list-decimal' : 'list-disc'
  )
  const listTag = `${type}l`

  return React.createElement(listTag, { className: allClassNames }, children)
}

export const ListItem = ({ children }: TListItemProps) => {
  return <li className="mb-2">{children}</li>
}
