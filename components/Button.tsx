import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'

export enum EButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export enum EButtonAs {
  BUTTON = 'button',
  LINK = 'a',
}

export enum EButtonVariants {
  PRIMARY = 'bg-primary-900 text-background border-none hover:bg-primary-500',
  SECONDARY = 'bg-transparent text-heading border-border-500 hover:border-border-900',
  TERTIARY = 'bg-tertiary-900 text-background border-none hover:bg-tertiary-500',
}

export enum EButtonSizes {
  EXTRA_SMALL = 'px-2 py-1 text-xs',
  SMALL = 'px-3 py-1.5 text-sm',
  MEDIUM = 'px-4 py-2 text-base',
  LARGE = 'px-5 py-2 text-lg',
  EXTRA_LARGE = 'px-6 py-2.5 text-xl',
}

export enum EButtonRounded {
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
  className?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

type TEButtonAsButton = TBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TBaseProps> & {
    EButtonAs?: EButtonAs.BUTTON
  }

type TEButtonAsLink = TBaseProps &
  Omit<LinkProps, keyof TBaseProps> & {
    EButtonAs: EButtonAs.LINK
  }

type TButtonProps = TEButtonAsButton | TEButtonAsLink

const Button = ({
  children,
  variant = EButtonVariants.PRIMARY,
  type = EButtonTypes.BUTTON,
  size = EButtonSizes.MEDIUM,
  rounded = EButtonRounded.LARGE,
  fluid,
  className,
  prefix,
  suffix,
  ...rest
}: TButtonProps) => {
  const defaultClassName =
    'inline-flex justify-center items-center border outline-none font-semibold transition-all active:scale-95'
  const allClassNames = clsx(
    defaultClassName,
    className,
    fluid ? 'w-full' : 'w-auto',
    variant,
    size,
    rounded
  )

  if (rest.EButtonAs === EButtonAs.LINK) {
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

  return (
    <button type={type} className={allClassNames} {...rest}>
      {prefix && prefix}
      {children}
      {suffix && suffix}
    </button>
  )
}

export default Button
