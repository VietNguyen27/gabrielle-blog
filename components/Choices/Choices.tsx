import React, { useEffect, useRef, useState } from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Error } from '@components/Error'
import { useError } from '@lib/store'
import { removeErrorFromObject } from '@utils/utils'

enum EChoiceTypes {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  CUSTOMIZE = 'text',
}

type TKeyValues = {
  keyName: string
  keyCode: number
}

type TChoicesProps = {
  className?: string
  options: any
  onChange?: any
  error?: string
  errorName?: string
  multiple?: boolean
  customizable?: boolean
}

type TChoiceProps = {
  keyValues?: TKeyValues
  label?: string
  name?: string
  value?: string
  type?: string
  onChange?: any
  errorName?: string
  isCustomize?: boolean
  setIsCustomize?: any
  isSelected?: boolean
  setIsSelected?: any
  customizeValue?: string
  setCustomizeValue?: any
}

const ALPHABET_LIST = [...'abcdefghijklmnopqrstuvwxyz']
const ALPHABET_KEYCODE_VALUES = ALPHABET_LIST.reduce(
  (prev: any, curr, index) => {
    const ALPHABET_KEYCODE_START = 65
    const keyValues = {
      keyName: curr.toUpperCase(),
      keyCode: ALPHABET_KEYCODE_START + index,
    }
    return [...prev, keyValues]
  },
  []
)

const Choice = ({
  keyValues,
  label,
  name,
  value,
  type,
  onChange,
  errorName,
  isCustomize,
  setIsCustomize,
  isSelected,
  setIsSelected,
  customizeValue,
  setCustomizeValue,
}: TChoiceProps) => {
  const ref = useRef<any>(null)
  const { error: allError, setError } = useError()

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

    const isRadioInput = (element) => {
      if (element.type === EChoiceTypes.RADIO) {
        return !element.checked
      }
      return true
    }

    const handleKeyPress = (event) => {
      if (event.keyCode === keyValues?.keyCode) {
        if (
          ref.current &&
          ref.current.type === EChoiceTypes.CUSTOMIZE &&
          isInViewport(ref.current.parentNode)
        ) {
          setIsCustomize((prevState) => !prevState)
          return
        }

        if (
          ref.current &&
          isInViewport(ref.current.parentNode) &&
          isRadioInput(ref.current)
        ) {
          const isChecked = ref.current.checked
          ref.current.checked = !isChecked
          handleChange(ref.current)
        }
      }
    }

    if (!isCustomize && customizeValue?.trim()) {
      ref.current.checked = false
    }

    if (isCustomize) {
      ref.current.focus()
    }

    if (!isCustomize) {
      window.addEventListener('keydown', handleKeyPress)
      return () => {
        window.removeEventListener('keydown', handleKeyPress)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomize, customizeValue])

  const onMouseDown = () => {
    const newError = removeErrorFromObject(allError, errorName)
    setError(newError)
  }

  const handleChange = (element) => {
    const { value } = element
    if (type === EChoiceTypes.RADIO) {
      onChange(value)
    } else {
      onChange((prevState) => {
        const valueExisted = prevState.some((state) => state === value)

        if (valueExisted) return prevState.filter((state) => state !== value)
        return [...prevState, value]
      })
    }
    setIsSelected(false)
  }

  if (type === EChoiceTypes.CUSTOMIZE) {
    if (isCustomize) {
      return (
        <div
          className="flex h-9 items-stretch rounded border border-gray-700 bg-gray-100 py-1 pl-1.5 pr-1"
          onMouseDown={onMouseDown}
        >
          <input
            ref={ref}
            type="text"
            value={customizeValue}
            onChange={(e) => setCustomizeValue(e.target.value)}
            onBlur={() => setCustomizeValue((prevState) => prevState.trim())}
            className="w-full bg-transparent outline-none"
          />
          <span
            role="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded bg-gray-700 text-white"
            onClick={() => {
              if (customizeValue && customizeValue.trim()) {
                setIsSelected(!!customizeValue)
                onChange(customizeValue)
              }
              setIsCustomize(false)
            }}
          >
            <CheckIcon className="h-5 w-5" />
          </span>
        </div>
      )
    }

    return (
      <div
        className="group relative flex h-9 cursor-pointer items-center p-1.5 pr-8 text-lg"
        onClick={() => setIsCustomize(true)}
        onMouseDown={onMouseDown}
      >
        <input
          ref={ref}
          type="text"
          value={customizeValue}
          onChange={() => null}
          className="hidden"
        />
        <span
          className={clsx(
            'invisible absolute top-1/2 right-[calc(100%-13px)] z-10 hidden h-6 -translate-y-1/2 items-center whitespace-nowrap rounded-tl-sm rounded-bl-sm border border-r-0 border-gray-700 px-1 text-xs font-semibold group-hover:visible md:inline-flex',
            isSelected ? 'bg-gray-700 text-white' : 'bg-white'
          )}
        >
          Key
        </span>
        <span
          className={clsx(
            'relative mr-2 hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm border border-gray-700 text-xs font-bold md:inline-flex',
            isSelected ? 'bg-gray-700 text-white' : 'bg-white'
          )}
        >
          {keyValues?.keyName}
        </span>
        <span className="font-semibold line-clamp-1">
          {customizeValue?.trim() ? customizeValue.trim() : 'Other'}
        </span>
        <div
          className={clsx(
            'absolute inset-0 h-full w-full rounded border-gray-700 transition-all after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:bg-gray-100 after:hover:bg-gray-200',
            isSelected ? 'border-2' : 'border'
          )}
        />
        {isSelected && (
          <CheckIcon className="absolute top-1/2 right-2 mr-1 h-5 w-5 -translate-y-1/2" />
        )}
      </div>
    )
  }

  return (
    <label
      className="group relative flex cursor-pointer items-center p-1.5 pr-8 text-lg"
      onMouseDown={onMouseDown}
    >
      <input
        ref={ref}
        type={type}
        value={value}
        name={name}
        onChange={(e) => handleChange(e.target)}
        className="peer hidden"
      />
      <span className="invisible absolute top-1/2 right-[calc(100%-13px)] z-10 hidden h-6 -translate-y-1/2 items-center whitespace-nowrap rounded-tl-sm rounded-bl-sm border border-r-0 border-gray-700 bg-white px-1 text-xs font-semibold group-hover:visible peer-checked:bg-gray-700 peer-checked:text-white md:inline-flex">
        Key
      </span>
      <span className="relative mr-2 hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm border border-gray-700 bg-white text-xs font-bold peer-checked:bg-gray-700 peer-checked:text-white md:inline-flex">
        {keyValues?.keyName}
      </span>
      <span className="font-semibold line-clamp-1">{label}</span>
      <div className="absolute inset-0 h-full w-full rounded border border-gray-700 transition-all after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:bg-gray-100 after:hover:bg-gray-200 peer-checked:border-2" />
      <CheckIcon className="invisible absolute top-1/2 right-2 mr-1 h-5 w-5 -translate-y-1/2 opacity-0 peer-checked:visible peer-checked:opacity-100" />
    </label>
  )
}

const Choices = ({
  className,
  options,
  onChange,
  error,
  errorName,
  multiple = false,
  customizable = false,
}: TChoicesProps) => {
  const MAX_CHOICE_PER_ROW = 10
  const TOTAL_COLUMN = Math.ceil(options.length / MAX_CHOICE_PER_ROW)
  const defaultClassName = 'grid gap-2.5'
  const allClassNames = clsx(defaultClassName, className)
  const [customizeValue, setCustomizeValue] = useState<string>('')
  const [isCustomize, setIsCustomize] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)

  return (
    <>
      <div
        className={allClassNames}
        style={{
          gridTemplateColumns: `repeat(${TOTAL_COLUMN}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option, index) => {
          const keyValues = ALPHABET_KEYCODE_VALUES[index]
          const type = multiple ? EChoiceTypes.CHECKBOX : EChoiceTypes.RADIO

          return (
            <Choice
              key={index}
              keyValues={keyValues}
              type={type}
              onChange={onChange}
              errorName={errorName}
              isCustomize={isCustomize}
              setIsCustomize={setIsCustomize}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              customizeValue={customizeValue}
              setCustomizeValue={setCustomizeValue}
              {...option}
            />
          )
        })}
        {customizable && (
          <Choice
            keyValues={ALPHABET_KEYCODE_VALUES[options.length]}
            type={EChoiceTypes.CUSTOMIZE}
            onChange={onChange}
            errorName={errorName}
            isCustomize={isCustomize}
            setIsCustomize={setIsCustomize}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            customizeValue={customizeValue}
            setCustomizeValue={setCustomizeValue}
          />
        )}
      </div>
      {error && <Error className="pt-2">{error}</Error>}
    </>
  )
}

export default Choices
