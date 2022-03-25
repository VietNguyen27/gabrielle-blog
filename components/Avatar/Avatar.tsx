import React from 'react'
import { ImageRatio } from '@components/ImageRatio'
import clsx from 'clsx'

type TAvatarProps = {
  src: string
  alt: string
  className?: string
}

const Avatar = ({ src, alt, className = 'w-10' }: TAvatarProps) => {
  const defaultClassName = 'rounded-full border border-gray-200'
  const allClassNames = clsx(defaultClassName, className)

  return <ImageRatio className={allClassNames} src={src} alt={alt} />
}

export default Avatar
