import clsx from 'clsx'
import React from 'react'

type TImageProps = {
  src: string
  ratio?: number
  alt?: string
  className?: string
  style?: any
}

const ImageRatio = ({
  src,
  ratio = 1 / 1,
  alt = '',
  className,
  style,
}: TImageProps) => {
  const isAbsolute = className?.includes('absolute')
  const allClassNames = clsx(className, isAbsolute ? 'absolute' : 'relative')

  return (
    <div
      className={allClassNames}
      style={{
        ['--aspect-ratio' as any]: ratio,
        ...(style && { ...style }),
      }}
    >
      <img src={src} alt={alt} />
    </div>
  )
}

export default ImageRatio
