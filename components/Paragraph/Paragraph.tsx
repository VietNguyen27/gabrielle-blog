import React, { ReactNode } from 'react'
import clsx from 'clsx'

type TParagraphProps = {
  children: ReactNode
  className?: string
}

const Paragraph = ({ children, className }: TParagraphProps) => {
  const defaultClassName = 'mb-4'
  const allClassNames = clsx(defaultClassName, className)

  return <p className={allClassNames}>{children}</p>
}

export default Paragraph
