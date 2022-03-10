import React from 'react'
import clsx from 'clsx'

type TErrorProps = {
  children: string
  className?: string
}

const Error = ({ children, className }: TErrorProps) => {
  const defaultClassName = 'text-sm text-red-500'
  const allClassNames = clsx(defaultClassName, className)

  return <p className={allClassNames}>{children}</p>
}

export default Error
