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
}

export enum EButtonSizes {
  EXTRA_SMALL = 'px-2 py-1 text-xs',
  SMALL = 'px-3 py-1.5 text-sm',
  MEDIUM = 'px-4 py-2 text-base',
  LARGE = 'px-5 py-2 text-lg',
  EXTRA_LARGE = 'px-6 py-2.5 text-xl',
}

export enum EButtonRounded {
  NONE = '',
  EXTRA_SMALL = 'rounded',
  SMALL = 'rounded-lg',
  MEDIUM = 'rounded-xl',
  LARGE = 'rounded-3xl',
  EXTRA_LARGE = 'rounded-full',
}

type TBaseProps = {
  children: ReactNode
  variant?: EButtonVariants
  type?: EButtonTypes
  size?: EButtonSizes
  rounded?: EButtonRounded
  fluid?: boolean
  loading?: boolean
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
  onPressEnter?: () => void
}

type TEButtonAsButton = TBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TBaseProps> & {
    buttonAs?: EButtonAs.BUTTON
  }

type TEButtonAsLink = TBaseProps &
  Omit<LinkProps, keyof TBaseProps> & {
    buttonAs: EButtonAs.LINK
  }

type TEButtonAsLabel = TBaseProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof TBaseProps> & {
    buttonAs: EButtonAs.LABEL
  }

type TButtonProps = TEButtonAsButton | TEButtonAsLink | TEButtonAsLabel

const Button = ({
  children,
  variant = EButtonVariants.PRIMARY,
  type = EButtonTypes.BUTTON,
  size = EButtonSizes.MEDIUM,
  rounded = EButtonRounded.LARGE,
  fluid,
  loading,
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
    variant,
    size,
    rounded
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
      {loading && <Loading className="bg-primary-900" />}
    </button>
  )
}

export default Button
