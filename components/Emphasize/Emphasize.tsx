import clsx from 'clsx'
import React, { ReactNode } from 'react'

type TEmphasizeProps = {
  children: ReactNode
  className?: string
}

const Emphasize = ({ children, className }: TEmphasizeProps) => {
  const defaultClassName = 'font-semibold text-tertiary-500'
  const allClassNames = clsx(defaultClassName, className)

  return <span className={allClassNames}>{children}</span>
}

export default Emphasize
