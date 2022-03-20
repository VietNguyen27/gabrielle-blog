import {
  useState,
  ReactChild,
  ReactChildren,
  Fragment,
  cloneElement,
} from 'react'
import clsx from 'clsx'

type TTabsProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
  className?: string
  labelClassName?: string
  horizontal?: boolean
}

type TTabProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
  className?: string
  label: string
  ref?: any
  onChange?: () => void
}

type TTabLabelProps = {
  children: ReactChild | ReactChildren
  isActive: boolean
  className?: string
  horizontal?: boolean
  onClick: () => void
}

const TabLabel = ({
  children,
  isActive,
  className,
  horizontal,
  ...rest
}: TTabLabelProps) => {
  const defaultClassName =
    'relative font-semibold cursor-pointer rounded transition-all duration-200 hover:text-tertiary-900 hover:bg-indigo-100'
  const allClassNames = clsx(
    defaultClassName,
    className,
    isActive ? 'text-zinc-900' : 'text-gray-400',
    horizontal ? 'text-left p-2' : 'text-center py-1 px-3',
    isActive && horizontal && 'bg-indigo-50'
  )

  return (
    <li className={allClassNames} {...rest}>
      {children}
    </li>
  )
}

export const Tabs = ({
  children,
  className,
  labelClassName,
  horizontal = false,
  ...rest
}: TTabsProps) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)
  const defaultTabsClassName = 'flex items-stretch'
  const tabsClassNames = clsx(
    defaultTabsClassName,
    className,
    horizontal ? 'flex-col md:flex-row' : 'flex-col'
  )

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className={tabsClassNames} {...rest}>
      <ul
        className={clsx(
          'px-layout mb-3 flex gap-3',
          horizontal
            ? 'flex-col items-stretch justify-start'
            : 'flex-row items-center justify-center'
        )}
      >
        {children instanceof Array &&
          children.map((child, index) => (
            <TabLabel
              key={index}
              isActive={child.props.label === activeTab}
              horizontal={horizontal}
              className={labelClassName}
              onClick={() => {
                if (child.props.onChange) {
                  child.props.onChange()
                }
                changeTab(child.props.label)
              }}
            >
              {child.props.label}
            </TabLabel>
          ))}
      </ul>
      {children instanceof Array &&
        children.map((child, index) => {
          const className = clsx(
            child.props.className,
            child.props.label !== activeTab && 'hidden'
          )

          return (
            <Fragment key={index}>
              {cloneElement(child, {
                className,
              })}
            </Fragment>
          )
        })}
    </div>
  )
}

export const Tab = ({ children, label, className, ...rest }: TTabProps) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}
