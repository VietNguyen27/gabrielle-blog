import React, { useState } from 'react'
import clsx from 'clsx'

type TCheckboxProps = {
  label?: string
  size?: number
  containerClassName?: string
  checkboxClassName?: string
  checked?: boolean
}

const Checkbox = ({
  label,
  size = 20,
  containerClassName,
  checkboxClassName,
  checked = false,
  ...rest
}: TCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked)
  const defaultClassName =
    'inline-flex select-none items-center text-sm gap-2 cursor-pointer'
  const allClassNames = clsx(defaultClassName, containerClassName)
  const checkboxClassNames = clsx(
    'relative inline-flex items-center justify-center w-checkbox h-checkbox border border-gray-800 rounded transition-all after:w-1/3 after:h-2/3 after:border-r-2 after:border-b-2 after:border-white after:-translate-y-0.5 after:rotate-45',
    isChecked ? 'bg-gray-800 after:visible' : 'after:invisible'
  )

  const onChange = () => {
    setIsChecked((prevState) => !prevState)
  }

  return (
    <label
      className={allClassNames}
      style={{
        ['--checkbox-size' as any]: `${size}px`,
      }}
    >
      <span className={checkboxClassNames}></span>
      <input
        className="hidden"
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
        {...rest}
      />
      {label}
    </label>
  )
}

export default Checkbox
