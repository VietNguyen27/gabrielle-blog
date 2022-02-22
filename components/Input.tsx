import clsx from 'clsx'
import React, { forwardRef, ReactNode, useRef, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

const MAX_LENGTH_INPUT = 64

export enum EInputTypes {
  EMAIL = 'email',
  TEXT = 'text',
  PASSWORD = 'password',
}

export enum EInputSizes {
  EXTRA_SMALL = 'px-2.5 py-1',
  SMALL = 'px-3 py-1.5',
  MEDIUM = 'px-3.5 py-2',
  LARGE = 'px-4 py-2.5',
  EXTRA_LARGE = 'px-5 py-3',
}

export enum EInputRounded {
  EXTRA_SMALL = 'rounded',
  SMALL = 'rounded-lg',
  MEDIUM = 'rounded-xl',
  LARGE = 'rounded-3xl',
  EXTRA_LARGE = 'rounded-full',
}

type TInputProps = {
  type?: EInputTypes
  size?: EInputSizes
  rounded?: EInputRounded
  placeholder: string
  className?: string
  maxLength?: number
  readOnly?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      type = EInputTypes.TEXT,
      size = EInputSizes.MEDIUM,
      rounded = EInputRounded.SMALL,
      placeholder,
      className,
      maxLength = MAX_LENGTH_INPUT,
      prefix,
      suffix,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const inputContainerRef = useRef(null)
    const isInputPassword = type === EInputTypes.PASSWORD
    const defaultClassName =
      'flex items-stretch border border-gray-200 focus-within:border-gray-700'
    const allClassNames = clsx(defaultClassName, rounded, className)
    const iconClassNames = 'w-5 h-5'

    const onBlur = (e) => {
      const { value } = e.target

      if (!value) {
        setIsFocus(false)
      }
    }

    return (
      <div className={allClassNames}>
        <div className={clsx('relative w-full', size)} ref={inputContainerRef}>
          <label
            className={clsx(
              'pointer-events-none absolute transition-all',
              isFocus
                ? '-mx-0.5 bg-white px-1 text-xs text-gray-800'
                : 'text-gray-400'
            )}
            style={
              isFocus
                ? {
                    transform: `translateY(-${
                      (inputContainerRef.current as any).offsetHeight / 2 - 2
                    }px)`,
                  }
                : {}
            }
          >
            {placeholder}
          </label>
          <input
            {...(isInputPassword && showPassword
              ? { type: EInputTypes.TEXT }
              : { type: EInputTypes.PASSWORD })}
            {...(!isInputPassword && { type: type })}
            className="w-full border-none bg-transparent outline-none"
            maxLength={maxLength}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            ref={ref}
            onFocus={() => setIsFocus(true)}
            onBlur={onBlur}
            {...rest}
          />
        </div>
        {type === EInputTypes.PASSWORD && (
          <button
            type="button"
            className="mr-2.5 outline-none"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <EyeIcon className={iconClassNames} />
            ) : (
              <EyeOffIcon className={iconClassNames} />
            )}
          </button>
        )}
      </div>
    )
  }
)

export default Input
