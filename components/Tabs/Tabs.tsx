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
  onClick: () => void
}

const TabLabel = ({
  children,
  isActive,
  className,
  ...rest
}: TTabLabelProps) => {
  const defaultClassName =
    'relative font-semibold text-center cursor-pointer py-1 px-3 rounded transition-all duration-200 hover:text-tertiary-900 hover:bg-indigo-100'
  const allClassNames = clsx(
    defaultClassName,
    isActive ? 'text-zinc-900' : 'text-gray-400'
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
  ...rest
}: TTabsProps) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)
  const defaultTabsClassName = 'flex flex-col items-stretch'
  const tabsClassNames = clsx(defaultTabsClassName, className)

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className={tabsClassNames} {...rest}>
      <ul className="px-layout mb-3 flex items-center justify-center gap-3">
        {children instanceof Array &&
          children.map((child, index) => (
            <TabLabel
              key={index}
              isActive={child.props.label === activeTab}
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
