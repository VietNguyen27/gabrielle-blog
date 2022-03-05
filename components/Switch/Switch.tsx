import React from 'react'
import cx from 'clsx'

type TSwitchProps = {
  active: boolean
  size?: number
  className?: string
  label?: string
  toggle: () => void
}

const Switch = ({
  active = false,
  size = 16,
  className,
  label,
  toggle,
}: TSwitchProps) => {
  const defaultClassName =
    'relative box-content p-1 h-switch-toggle w-switch rounded-full cursor-pointer'
  const allClassNames = cx(
    defaultClassName,
    active ? 'bg-tertiary-900' : 'bg-gray-800',
    className
  )

  return (
    <div className="flex items-center gap-2">
      <div
        className={allClassNames}
        style={{
          ['--switch-toggle-size' as any]: `${size}px`,
        }}
        onClick={toggle}
      >
        <span
          className={cx(
            'absolute h-switch-toggle w-switch-toggle rounded-full bg-white transition-transform',
            active && 'translate-x-full'
          )}
        ></span>
      </div>
      {label && <span className="text-sm font-semibold">{label}</span>}
    </div>
  )
}

export default Switch
