import React, { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type TALinkProps = {
  href: string
  children: ReactNode
  className?: string
}

const ALink = ({ href, className, children }: TALinkProps) => {
  const defaultClassName = 'text-tertiary-500 hover:text-tertiary-900'
  const allClassNames = clsx(defaultClassName, className)

  return (
    <Link href={href}>
      <a className={allClassNames}>{children}</a>
    </Link>
  )
}

export default ALink
