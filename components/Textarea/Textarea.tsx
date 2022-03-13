import React, { forwardRef, useEffect, useRef } from 'react'
import clsx from 'clsx'

const MAX_LENGTH = 256

type TTextareaProps = {
  placeholder?: string
  className?: string
  maxLength?: number
  readOnly?: boolean
  contentRef?: any
}

const Textarea = forwardRef<HTMLDivElement, TTextareaProps>(
  (
    {
      placeholder = 'Type something here',
      className,
      maxLength = MAX_LENGTH,
      contentRef,
      ...rest
    },
    ref
  ) => {
    const defaultClassName = 'relative'
    const allClassNames = clsx(defaultClassName, className)
    const placeholderRef = useRef(null)
    const textContent =
      ref && 'current' in ref && ref.current && ref.current.textContent

    useEffect(() => {
      if (
        ref &&
        'current' in ref &&
        ref.current &&
        ref.current.textContent?.trim().length
      ) {
        if (placeholderRef.current) {
          ;(placeholderRef.current as HTMLSpanElement).textContent = ''
        }
      }
    }, [textContent])

    const onKeyPress = (e) => {
      const value = e.target.textContent + e.key
      const placeholderEl = placeholderRef.current

      if (placeholderEl && value.trim().length) {
        ;(placeholderEl as HTMLSpanElement).textContent = ''
      }
    }

    const onKeyUp = (e) => {
      const SPACEBAR_CODE = 32
      const placeholderEl = placeholderRef.current

      if (e.keyCode === SPACEBAR_CODE && placeholderEl) {
        ;(placeholderEl as HTMLSpanElement).textContent = ''
      }

      if (contentRef && e.key !== 'Enter') {
        contentRef.current = e.target.innerText
      }

      if (placeholderEl && (e.key === 'Backspace' || e.key === 'Delete')) {
        const isEmpty = !e.target.textContent.trim()

        ;(placeholderEl as HTMLSpanElement).textContent = isEmpty
          ? placeholder
          : ''
      }
    }

    const onKeyDown = (e) => {
      const charCode = String.fromCharCode(e.which).toLowerCase()

      if ((e.ctrlKey || e.metaKey) && charCode === 'v') {
        const placeholderEl = placeholderRef.current

        if (placeholderEl) {
          ;(placeholderEl as HTMLSpanElement).textContent = ''
        }
      }
    }

    return (
      <div className={allClassNames} tabIndex={-1}>
        <div
          ref={ref}
          className={clsx('w-full break-all outline-none', className)}
          contentEditable="true"
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
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
