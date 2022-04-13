import React, { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type TAnchorProps = {
  href: string
  children: ReactNode
  className?: string
  target?: string
}

const Anchor = ({
  href,
  className,
  children,
  target = '_self',
}: TAnchorProps) => {
  const defaultClassName = 'text-tertiary-500 hover:text-tertiary-900'
  const allClassNames = clsx(defaultClassName, className)

  return (
    <Link href={href}>
      <a className={allClassNames} target={target}>
        {children}
      </a>
    </Link>
  )
}

export default Anchor
