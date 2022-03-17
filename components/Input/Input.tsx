import React, { forwardRef, ReactNode, useRef, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useError } from '@lib/store'
import { Error } from '@components/Error'
import { ChangeHandler } from 'react-hook-form'
import { removeErrorFromObject } from '@utils/utils'

const MAX_LENGTH_INPUT = 64

type TInputVariants = 'primary' | 'secondary'
type TInputTypes = 'email' | 'text' | 'password'
type TInputSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TInputRounded = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type TInputProps = {
  variant?: TInputVariants
  type?: TInputTypes
  size?: TInputSizes
  rounded?: TInputRounded
  name: string
  label?: string
  placeholder?: string
  className?: string
  error?: string
  maxLength?: number
  readOnly?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  onBlur?: ChangeHandler
}

const inputSizes = {
  xs: 'px-2.5 py-1',
  sm: 'px-3 py-1.5',
  md: 'px-3.5 py-2',
  lg: 'px-4 py-2.5',
  xl: 'px-5 py-3',
}

const inputRounded = {
  xs: 'rounded',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-3xl',
  xl: 'rounded-full',
}

const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      variant = 'primary',
      type = 'text',
      size = 'md',
      rounded = 'sm',
      name,
      label,
      placeholder,
      className,
      error,
      maxLength = MAX_LENGTH_INPUT,
      prefix,
      suffix,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const inputContainerRef = useRef(null)
    const { error: allError, setError } = useError()
    const isInputPassword = type === 'password'
    const iconClassNames = 'w-5 h-5'

    const handleBlur = (e) => {
      const { value } = e.target

      if (!value) {
        setIsFocus(false)
      }

      if (onBlur) {
        onBlur(e)
      }
    }

    const onKeyPress = () => {
      const newError = removeErrorFromObject(allError, name)
      setError(newError)
    }

    if (variant === 'primary') {
      const defaultClassName =
        'relative flex items-stretch border border-gray-200 mb-3 focus-within:border-gray-700'
      const allClassNames = clsx(
        defaultClassName,
        className,
        inputRounded[rounded]
      )

      return (
        <div className={allClassNames}>
          <div
            className={clsx('relative w-full', inputSizes[size])}
            ref={inputContainerRef}
          >
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
              {label}
            </label>
            <input
              {...(isInputPassword && showPassword
                ? { type: 'text' }
                : { type: 'password' })}
              {...(!isInputPassword && { type: type })}
              className="w-full border-none bg-transparent outline-none"
              maxLength={maxLength}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              ref={ref}
              name={name}
              onFocus={() => setIsFocus(true)}
              onBlur={handleBlur}
              onKeyPress={onKeyPress}
              {...rest}
            />
          </div>
          {type === 'password' && (
            <button
              type="button"
              className="mr-2.5 outline-none"
              onClick={() => setShowPassword((prevState) => !prevState)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeIcon className={iconClassNames} />
              ) : (
                <EyeOffIcon className={iconClassNames} />
              )}
            </button>
          )}
          {error && <Error className="absolute top-full">{error}</Error>}
        </div>
      )
    }

    const defaultClassName =
      'relative flex items-end py-1 border-b-2 border-gray-200 transition-all focus-within:border-gray-700'
    const allClassNames = clsx(defaultClassName, className)

    return (
      <div className={allClassNames}>
        <label className="block w-full">
          <span className="text-base font-semibold">{label}</span>
          <input
            {...(isInputPassword && showPassword
              ? { type: 'text' }
              : { type: 'password' })}
            {...(!isInputPassword && { type: type })}
            className="w-full border-none bg-transparent outline-none"
            maxLength={maxLength}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder}
            ref={ref}
            name={name}
            onBlur={handleBlur}
            onKeyPress={onKeyPress}
            {...rest}
          />
        </label>
        {type === 'password' && (
          <button
            type="button"
            className="mr-2.5 pl-2.5 outline-none"
            onClick={() => setShowPassword((prevState) => !prevState)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeIcon className={iconClassNames} />
            ) : (
              <EyeOffIcon className={iconClassNames} />
            )}
          </button>
        )}
        {error && <Error className="absolute top-full pt-0.5">{error}</Error>}
      </div>
    )
  }
)

export default Input
