import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { XIcon } from '@heroicons/react/solid'
import { capitalizeFirstLetter, getRandomColor } from '@utils/utils'
import { NoSSR } from '@components/NoSSR'

type TSelectProps = {
  title?: string
  options: object[]
  multiple?: boolean
  autoFill?: boolean
  maxOptions?: number
  maxHeight?: number
  placeholder: string
  placeholderAfterChange?: string
  selectedOptions: object[] | null
  onChange: any
}

type TOptionProps = {
  color: string
  label: string
  value: string
  description: string
  onChange: any
}

type TSelectedOptionProps = {
  index: number
  label: string
  color: string
  onChange: any
}

const SelectedOption = ({
  index,
  label,
  color,
  onChange,
}: TSelectedOptionProps) => {
  return (
    <li
      className="inline-flex items-center rounded-md px-2.5 py-1 lowercase"
      style={{ backgroundColor: `${color}25` }}
    >
      <span className="mr-0.5" style={{ color }}>
        #
      </span>
      {label}
      <XIcon
        role="button"
        className="ml-2 h-5 w-5"
        onClick={() => onChange(index)}
      />
    </li>
  )
}

const Option = ({
  color,
  label,
  value,
  description,
  onChange,
}: TOptionProps) => {
  return (
    <li
      className="group flex cursor-pointer flex-col items-stretch rounded px-2 py-2.5 lowercase hover:bg-gray-100"
      onClick={() => onChange({ value, label, color })}
    >
      <p>
        <NoSSR>
          <span className="mr-0.5 opacity-75" style={{ color }}>
            #
          </span>
        </NoSSR>
        <span className="group-hover:text-tertiary-500">{label}</span>
      </p>
      {description && (
        <p className="text-sm font-medium normal-case line-clamp-2">
          {description}
        </p>
      )}
    </li>
  )
}

const Select = ({
  title,
  options,
  multiple,
  autoFill = true,
  maxOptions = 4,
  maxHeight = 300,
  placeholder,
  placeholderAfterChange,
  selectedOptions,
  onChange,
}: TSelectProps) => {
  const validOptions = options
    ? options.filter(
        (option: any) =>
          selectedOptions &&
          !selectedOptions.find(
            (selected: any) =>
              selected.value.toLowerCase() === option.value.toLowerCase()
          )
      )
    : []
  const [inputValue, setInputValue] = useState<string>('')
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [filteredOptions, setFilteredOptions] = useState(validOptions)
  const selectRef = useRef(null)
  const inputRef = useRef(null)

  const handleClickOutside = () => setShowOptions(false)

  useOnClickOutside(selectRef, handleClickOutside)

  useEffect(() => {
    setFilteredOptions(validOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, options])

  const handleFilter = (e) => {
    const { value } = e.target

    setInputValue(value)
    setFilteredOptions(
      validOptions.filter((option: any) =>
        option.value.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleFill = (e) => {
    const { value } = e.target
    const TAB_KEYCODE = 9

    if (e.keyCode === TAB_KEYCODE && value.trim().length) {
      e.preventDefault()
      const option = {
        value,
        label: capitalizeFirstLetter(value),
        color: getRandomColor(),
      }
      handleSelect(option)
      setInputValue('')
      setShowOptions(true)
      setFilteredOptions(validOptions)
    }
  }

  const handleSelect = ({ value, label, color }) => {
    const option = { value, label, color }

    if (multiple) {
      if (selectedOptions && selectedOptions.length === maxOptions) {
        setShowOptions(false)
      } else {
        onChange((prevState) => [...prevState, option])
      }
    } else {
      onChange([option])
      setShowOptions(false)
    }
    setInputValue('')
  }

  const removeSelect = (index) => {
    const newSelectedOptions = selectedOptions?.filter((_, i) => i !== index)

    onChange(newSelectedOptions)
  }

  return (
    <div className="relative" ref={selectRef}>
      <div className="mb-2 flex flex-col items-stretch">
        {selectedOptions && (
          <ul className="mb-2 flex flex-wrap items-stretch gap-2">
            {selectedOptions.map((option: any, index) => (
              <SelectedOption
                key={index}
                index={index}
                onChange={removeSelect}
                {...option}
              />
            ))}
            <li className="flex flex-grow items-center">
              <input
                type="text"
                className="w-full font-semibold outline-none"
                placeholder={placeholderAfterChange || placeholder}
                ref={inputRef}
                value={inputValue}
                onFocus={() => setShowOptions(true)}
                {...(autoFill && {
                  onChange: handleFilter,
                  onKeyDown: handleFill,
                })}
              />
            </li>
          </ul>
        )}
      </div>
      <div
        className={clsx(
          'absolute z-40 flex w-full flex-col items-stretch rounded-md border border-gray-300 bg-white shadow-md',
          showOptions ? 'block' : 'hidden'
        )}
      >
        {title && (
          <div className="mx-1 border-b border-gray-300 px-3 py-2 text-xl font-bold">
            {title}
          </div>
        )}
        {selectedOptions && selectedOptions.length === maxOptions ? (
          <p className="px-4 py-2">Only {maxOptions} selections allowed</p>
        ) : (
          <ul
            className="mx-1 flex flex-col items-stretch overflow-auto py-2 font-semibold"
            style={{ maxHeight }}
          >
            {filteredOptions.map((option: any, index) => (
              <Option key={index} onChange={handleSelect} {...option} />
            ))}
            {!filteredOptions.length && (
              <li className="px-4 py-2">No options found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Select
