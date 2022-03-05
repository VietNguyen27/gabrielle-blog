import React, { forwardRef, useRef } from 'react'
import clsx from 'clsx'

const MAX_LENGTH = 256

type TTextareaProps = {
  placeholder?: string
  className?: string
  maxLength?: number
  readOnly?: boolean
}

const Textarea = forwardRef<HTMLDivElement, TTextareaProps>(
  (
    {
      placeholder = 'Type something here',
      className,
      maxLength = MAX_LENGTH,
      ...rest
    },
    ref
  ) => {
    const defaultClassName = 'relative'
    const allClassNames = clsx(defaultClassName, className)
    const placeholderRef = useRef(null)

    const onKeyPress = (e) => {
      const value = e.target.textContent + e.key
      const placeholderEl = placeholderRef.current

      if (placeholderEl && value.trim().length) {
        ;(placeholderEl as HTMLSpanElement).textContent = ''
      }
    }

    const onKeyUp = (e) => {
      const placeholderEl = placeholderRef.current

      if (placeholderEl && (e.key === 'Backspace' || e.key === 'Delete')) {
        const isEmpty = !e.target.textContent.trim()

        ;(placeholderEl as HTMLSpanElement).textContent = isEmpty
          ? placeholder
          : ''
      }
    }

    return (
      <div className={allClassNames}>
        <div
          ref={ref}
          className="w-full break-all outline-none"
          contentEditable="true"
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          {...rest}
        ></div>
        <span
          ref={placeholderRef}
          className="pointer-events-none absolute top-0 left-0 select-none text-gray-400"
        >
          {placeholder}
        </span>
      </div>
    )
  }
)

export default Textarea
