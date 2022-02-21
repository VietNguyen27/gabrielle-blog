import React, { ReactChild, ReactChildren } from 'react'
import clsx from 'clsx'

type TContainerProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
  className?: string
}

const Container = ({ children, className }: TContainerProps) => {
  const defaultClassName = 'container mx-auto px-4'
  const allClassNames = clsx(defaultClassName, className)

  return <div className={allClassNames}>{children}</div>
}

export default Container
