import React from 'react'
import cx from 'clsx'

type TLoadingProps = {
  className?: string
  color?: string
}

const Loading: React.FC<TLoadingProps> = ({ className, color = 'white' }) => {
  const defaultClassName =
    'absolute top-0 left-0 z-elevate flex h-full w-full items-center justify-center'
  const allClassNames = cx(defaultClassName, className)

  return (
    <div className={allClassNames}>
      <svg
        className="-mt-1 -mb-1 h-7 w-7 animate-rotate-loading"
        viewBox="0 0 50 50"
      >
        <circle
          className="animate-dash-loading"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  )
}

export default Loading
