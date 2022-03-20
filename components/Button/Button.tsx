import React, { ReactNode, useEffect, useRef } from 'react'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import { Loading } from '@components/Loading'

type TButtonTypes = 'button' | 'submit' | 'reset'
type TButtonVariants =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'quinary'
  | 'alert'

type TBaseProps = {
  children: ReactNode
  variant?: TButtonVariants
  type?: TButtonTypes
  fluid?: boolean
  loading?: boolean
  loadingBackground?: string
  className?: string
  target?: string
  prefix?: ReactNode
  suffix?: ReactNode
  onPressEnter?: () => void
}

type TButtonAsButton = TBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TBaseProps> & {
    as?: 'button'
  }

type TButtonAsLink = TBaseProps &
  Omit<LinkProps, keyof TBaseProps> & {
    as: 'a'
  }

type TButtonAsLabel = TBaseProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof TBaseProps> & {
    as: 'label'
  }

type TButtonProps = TButtonAsButton | TButtonAsLink | TButtonAsLabel

const buttonVariants = {
  primary:
    'bg-primary-900 text-white border-none hover:bg-primary-500 disabled:hover:bg-primary-900 focus-visible:outline-primary-500',
  secondary:
    'bg-transparent text-gray-800 border-gray-200 hover:border-gray-800 disabled:hover:bg-transparent',
  tertiary:
    'bg-tertiary-900 text-white border-none hover:bg-tertiary-500 disabled:hover:bg-tertiary-900 focus-visible:outline-tertiary-500',
  quaternary:
    'rounded border-none hover:bg-indigo-50 hover:text-tertiary-900 hover:fill-tertiary-900 active:bg-indigo-100 focus-visible:outline-tertiary-500',
  quinary:
    'rounded border-none text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-gray-300',
  alert:
    'text-white border-none bg-red-600 hover:bg-red-700 focus-visible:outline-red-200',
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  fluid,
  loading,
  loadingBackground = 'bg-primary-900',
  className,
  target = '_self',
  prefix,
  suffix,
  onPressEnter,
  ...rest
}: TButtonProps) => {
  const ref = useRef<any>(null)
  const defaultClassName =
    'relative inline-flex justify-center items-center gap-1 border outline-none font-semibold overflow-hidden transition-all disabled:text-gray-500'
  const allClassNames = clsx(
    defaultClassName,
    className,
    buttonVariants[variant],
    fluid ? 'w-full' : 'w-auto'
  )

  useEffect(() => {
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    const handleEnter = (event) => {
      if (event.keyCode === 13 && typeof onPressEnter === 'function') {
        if (ref.current && isInViewport(ref.current)) {
          onPressEnter()
        }
      }
    }

    window.addEventListener('keydown', handleEnter)
    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (rest.as === 'a') {
    const { as, ...otherAttr } = rest

    return (
      <Link {...otherAttr}>
        <a className={allClassNames} target={target}>
          {prefix && prefix}
          {children}
          {suffix && suffix}
        </a>
      </Link>
    )
  }

  if (rest.as === 'label') {
    const { as, ...otherAttr } = rest

    return (
      <label role="button" className={allClassNames} {...otherAttr}>
        {prefix && prefix}
        {children}
        {suffix && suffix}
      </label>
    )
  }

  if (typeof onPressEnter === 'function') {
    const { as, ...otherAttr } = rest

    return (
      <div className="relative" ref={ref}>
        <button type={type} className={allClassNames} {...otherAttr}>
          {prefix && prefix}
          {children}
          {suffix && suffix}
        </button>
        <span className="absolute top-1/2 left-full -translate-y-1/2 whitespace-nowrap pl-3 text-sm text-gray-800">
          press <strong>Enter ↵</strong>
        </span>
      </div>
    )
  }

  const { as, ...otherAttr } = rest
  return (
    <button type={type} className={allClassNames} ref={ref} {...otherAttr}>
      {prefix && prefix}
      {children}
      {suffix && suffix}
      {loading && <Loading className={loadingBackground} />}
    </button>
  )
}

export default Button
