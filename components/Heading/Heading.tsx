import React, { ReactNode } from 'react'
import clsx from 'clsx'

type THeadingProps = {
  children: ReactNode
  level?: number
  className?: string
}

const Heading = ({ children, level = 1, className }: THeadingProps) => {
  const defaultClassName = 'mb-3 pt-2 font-bold uppercase'
  const allClassNames = clsx(defaultClassName, className)
  const headingTag = `h${level}`

  return React.createElement(headingTag, { className: allClassNames }, children)
}

export default Heading
