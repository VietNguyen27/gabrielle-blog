import React, { ReactChild, ReactChildren } from 'react'
import cx from 'clsx'

export enum ETooltipDirection {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum ETooltipMessageDirection {
  TOP = 'bottom-full left-1/2 -translate-x-1/2 translate-y-1.5 group-hover:translate-y-0 mb-1',
  BOTTOM = 'top-full left-1/2 -translate-x-1/2 -translate-y-1.5 group-hover:translate-y-0 mt-1',
  LEFT = 'right-full top-1/2 -translate-y-1/2 translate-x-1.5 group-hover:translate-x-0 mr-1',
  RIGHT = 'left-full top-1/2 -translate-y-1/2 -translate-x-1.5 group-hover:translate-x-0 ml-1',
}

type TTooltipProps = {
  direction?: ETooltipDirection
  message: string
  children: ReactChild | ReactChildren
  className?: string
}

const Tooltip = ({
  className,
  message,
  direction = ETooltipDirection.TOP,
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
    ETooltipMessageDirection[direction]
  )

  return (
    <div className={allClassNames}>
      {children}
      <span className={tooltipClassName}>{message}</span>
    </div>
  )
}

export default Tooltip
