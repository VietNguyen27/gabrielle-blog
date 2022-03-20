import React, { forwardRef, ReactNode, useRef, useState } from 'react'
import {
  EyeIcon,
  EyeOffIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { useError } from '@lib/store'
import { Error } from '@components/Error'
import { ChangeHandler } from 'react-hook-form'
import { removeErrorFromObject } from '@utils/utils'
import { Tooltip } from '@components/Tooltip'
import { ChromePicker } from 'react-color'
import useOnClickOutside from '@hooks/useOnClickOutside'

const MAX_LENGTH_INPUT = 64

type TInputVariants = 'primary' | 'secondary'
type TInputTypes = 'email' | 'text' | 'password' | 'color'
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
  defaultValue?: string
  color?: string
  prefix?: ReactNode
  suffix?: ReactNode
  onBlur?: ChangeHandler
  onChangeColor?: any
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
      color,
      prefix,
      suffix,
      onBlur,
      onChangeColor,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const inputContainerRef = useRef(null)
    const { error: allError, setError } = useError()
    const isInputPassword = type === 'password'
    const iconClassNames = 'w-5 h-5'

    useOnClickOutside(inputContainerRef, () => setDisplayColorPicker(false))

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

    if (type === 'color') {
      return (
        <div className={className}>
          <label className="block w-full">
            <span className="mb-1 block text-base font-semibold">{label}</span>
            <div className="relative flex items-center rounded-md border border-gray-300 p-1">
              <div
                className="mr-2 h-8 w-8 cursor-pointer rounded-md"
                style={{ backgroundColor: color }}
                onClick={() => setDisplayColorPicker(true)}
              ></div>
              <span>{color}</span>
              {displayColorPicker && (
                <div
                  className="absolute top-full z-elevate"
                  ref={inputContainerRef}
                >
                  <ChromePicker color={color} onChange={onChangeColor} />
                </div>
              )}
            </div>
          </label>
        </div>
      )
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
            {prefix && prefix}
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
            {suffix && suffix}
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
      'relative flex items-end py-1 border-b-2 border-gray-200 transition-all'
    const allClassNames = clsx(
      defaultClassName,
      className,
      !rest.readOnly && 'focus-within:border-gray-700'
    )

    return (
      <div className={allClassNames}>
        <label className="block w-full">
          <span className="mb-1 inline-block text-base font-semibold">
            {label}
          </span>
          {prefix && prefix}
          <input
            {...(isInputPassword && showPassword
              ? { type: 'text' }
              : { type: 'password' })}
            {...(!isInputPassword && { type: type })}
            className={clsx(
              'w-full border-none bg-transparent outline-none',
              rest.readOnly && 'pointer-events-none'
            )}
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
          {suffix && suffix}
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
        {rest.readOnly && (
          <Tooltip
            className="absolute right-0"
            message="This field cannot be edited"
          >
            <InformationCircleIcon className="h-5 w-5 text-gray-600" />
          </Tooltip>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export default Input
