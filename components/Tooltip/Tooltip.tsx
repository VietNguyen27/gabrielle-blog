import React, { ReactChild, ReactChildren } from 'react'
import cx from 'clsx'

type TTooltipDirection = 'top' | 'bottom' | 'left' | 'right'

type TTooltipProps = {
  direction?: TTooltipDirection
  message: string
  children: ReactChild | ReactChildren
  className?: string
}

const tooltipMessageDirections = {
  top: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1.5 group-hover:translate-y-0 mb-1',
  bottom:
    'top-full left-1/2 -translate-x-1/2 -translate-y-1.5 group-hover:translate-y-0 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 translate-x-1.5 group-hover:translate-x-0 mr-1',
  right:
    'left-full top-1/2 -translate-y-1/2 -translate-x-1.5 group-hover:translate-x-0 ml-1',
}

const Tooltip = ({
  className,
  message,
  direction = 'top',
  children,
}: TTooltipProps) => {
  const isAbsolute = className && className.includes('absolute')
  const defaultClassName = 'group inline-flex items-center z-30'
  const allClassNames = cx(
    defaultClassName,
    className,
    !isAbsolute && 'relative'
  )
  const tooltipClassName = cx(
    'absolute bg-black text-white text-left text-sm px-3 py-1.5 whitespace-nowrap rounded opacity-0 invisible delay-300 transition-all group-hover:opacity-100 group-hover:visible',
    tooltipMessageDirections[direction]
  )

  return (
    <div className={allClassNames}>
      {children}
      <span className={tooltipClassName}>{message}</span>
    </div>
  )
}

export default Tooltip
