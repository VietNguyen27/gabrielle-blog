import React, { ReactNode, useEffect, useRef } from 'react'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import { Loading } from '@components/Loading'

export enum EButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum EButtonAs {
  BUTTON = 'button',
  LINK = 'a',
  LABEL = 'label',
}

export enum EButtonVariants {
  PRIMARY = 'bg-primary-900 text-white border-none hover:bg-primary-500 disabled:hover:bg-primary-900',
  SECONDARY = 'bg-transparent text-gray-800 border-gray-200 hover:border-gray-800 disabled:hover:bg-transparent',
  TERTIARY = 'bg-tertiary-900 text-white border-none hover:bg-tertiary-500 disabled:hover:bg-tertiary-900',
  QUATERNARY = 'rounded border-none hover:bg-indigo-50 hover:text-tertiary-900 hover:fill-tertiary-900 active:bg-indigo-100',
}

type TBaseProps = {
  children: ReactNode
  variant?: EButtonVariants
  type?: EButtonTypes
  fluid?: boolean
  loading?: boolean
  loadingBackground?: string
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
  onPressEnter?: () => void
}

type TButtonAsButton = TBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TBaseProps> & {
    buttonAs?: EButtonAs.BUTTON
  }

type TButtonAsLink = TBaseProps &
  Omit<LinkProps, keyof TBaseProps> & {
    buttonAs: EButtonAs.LINK
  }

type TButtonAsLabel = TBaseProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof TBaseProps> & {
    buttonAs: EButtonAs.LABEL
  }

type TButtonProps = TButtonAsButton | TButtonAsLink | TButtonAsLabel

const Button = ({
  children,
  variant = EButtonVariants.PRIMARY,
  type = EButtonTypes.BUTTON,
  fluid,
  loading,
  loadingBackground = 'bg-primary-900',
  className,
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
    fluid ? 'w-full' : 'w-auto',
    variant
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
  }, [])

  if (rest.buttonAs === EButtonAs.LINK) {
    return (
      <Link {...rest}>
        <a className={allClassNames}>
          {prefix && prefix}
          {children}
          {suffix && suffix}
        </a>
      </Link>
    )
  }

  if (rest.buttonAs === EButtonAs.LABEL) {
    const { buttonAs, ...otherAttr } = rest

    return (
      <label role="button" className={allClassNames} {...otherAttr}>
        {prefix && prefix}
        {children}
        {suffix && suffix}
      </label>
    )
  }

  if (typeof onPressEnter === 'function') {
    const { buttonAs, ...otherAttr } = rest

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

  return (
    <button type={type} className={allClassNames} ref={ref} {...rest}>
      {prefix && prefix}
      {children}
      {suffix && suffix}
      {loading && <Loading className={loadingBackground} />}
    </button>
  )
}

export default Button
