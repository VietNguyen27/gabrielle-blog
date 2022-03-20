import React, { ReactNode } from 'react'
import clsx from 'clsx'

type TTitleProps = {
  children: ReactNode
  className?: string
}

const Title = ({ children, className }: TTitleProps) => {
  const defaultClassName = 'text-xl md:text-2xl font-bold'
  const allClassNames = clsx(defaultClassName, className)

  return <h1 className={allClassNames}>{children}</h1>
}

export default Title
