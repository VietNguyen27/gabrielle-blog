import React, { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type TAnchorProps = {
  children: ReactNode
  href: string | object
  active?: boolean
  className?: string
  replace?: boolean
  scroll?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

const Anchor = ({
  children,
  href,
  active,
  className,
  prefix,
  suffix,
  ...rest
}: TAnchorProps) => {
  const defaultClassName =
    'relative font-semibold after:absolute after:left-0 after:-bottom-0.5  after:border-b after:border-gray-700 after:transition-all after:duration-300 hover:after:w-full'
  const allClassNames = clsx(
    defaultClassName,
    className,
    active ? 'after:w-full' : 'after:w-0'
  )

  return (
    <>
      {prefix && prefix}
      <Link href={href} {...rest}>
        <a className={allClassNames}>{children}</a>
      </Link>
      {suffix && suffix}
    </>
  )
}

export default Anchor
