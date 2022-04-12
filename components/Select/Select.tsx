import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { useOnClickOutside } from '@hooks/index'

type TOption = {
  label: string
  value: string
}

type TSelectProps = {
  options: TOption[]
  defaultValue?: TOption | {}
  maxHeight?: number
  onChange: (value: string) => void
  className?: string
}

const Select = ({
  options,
  defaultValue = {},
  maxHeight = 250,
  onChange,
  className,
}: TSelectProps) => {
  const [optionSelected, setOptionSelected] = useState(defaultValue)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const selectRef = useRef(null)
  const defaultClassName =
    'flex items-center justify-between cursor-pointer border border-gray-200 rounded pl-3.5 pr-2 py-2 focus-within:border-gray-700'
  const allClassNames = clsx(defaultClassName, className)

  const handleClickOutside = () => setShowOptions(false)

  useOnClickOutside(selectRef, handleClickOutside)

  const handleSelect = ({ value, label }) => {
    const option = { value, label }

    setShowOptions(false)
    setOptionSelected(option)
    onChange(value)
  }

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={allClassNames}
        tabIndex={0}
        onFocus={() => setShowOptions(true)}
      >
        {(optionSelected as TOption).label}
        {showOptions ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </div>
      <div
        className={clsx(
          'absolute top-[calc(100%+6px)] z-dropdown flex w-full flex-col items-stretch rounded-md border border-gray-300 bg-white shadow-md',
          showOptions ? 'block' : 'hidden'
        )}
      >
        <ul className="overflow-auto" style={{ maxHeight: `${maxHeight}px` }}>
          {options.map(({ value, label }) => (
            <li
              key={value}
              className="cursor-pointer px-3.5 py-2 transition-colors duration-200 hover:bg-gray-100"
              onClick={() => handleSelect({ value, label })}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
