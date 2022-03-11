import useOnClickOutside from '@hooks/useOnClickOutside'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import React, {
  Fragment,
  ReactChild,
  ReactChildren,
  ReactElement,
  useRef,
  useState,
} from 'react'

export enum EMenuItemAs {
  BUTTON = 'button',
  LINK = 'a',
}

type TDropdownProps = {
  children: ReactElement
  overlay: ReactElement
  className?: string
}

type TMenuProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
  open?: boolean
  className?: string
}

type TMenuItemBaseProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
  className?: string
  onClose?: () => void
}

type TMenuItemAsButton = TMenuItemBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof TMenuItemBaseProps
  > & {
    menuItemAs?: EMenuItemAs.BUTTON
  }

type TMenuItemAsLink = TMenuItemBaseProps &
  Omit<LinkProps, keyof TMenuItemBaseProps> & {
    menuItemAs: EMenuItemAs.LINK
  }

type TMenuItemProps = TMenuItemAsButton | TMenuItemAsLink

export const Dropdown = ({ children, overlay, className }: TDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const dropdownRef = useRef(null)
  const defaultClassName = 'relative z-dropdown'
  const allClassNames = clsx(defaultClassName, className)

  const onToggle = () => setOpen((prevState) => !prevState)
  const onClose = () => setOpen(false)

  useOnClickOutside(dropdownRef, onClose)

  return (
    <div className={allClassNames} ref={dropdownRef}>
      {React.cloneElement(children, { onClick: onToggle })}
      <Menu className={overlay.props.className} open={open}>
        {overlay.props.children.map((menuItem, index) => (
          <Fragment key={index}>
            {React.cloneElement(menuItem, { onClose })}
          </Fragment>
        ))}
      </Menu>
    </div>
  )
}

export const Menu = ({ children, open, className }: TMenuProps) => {
  const defaultClassName =
    'absolute top-full min-w-[200px] right-0 bg-white p-2 mt-1 shadow-md border border-gray-200 rounded-md overflow-hidden'
  const allClassNames = clsx(defaultClassName, className)

  return open ? <ul className={allClassNames}>{children}</ul> : <></>
}

export const MenuDivider = () => {
  return <li className="my-2 border-b border-gray-200"></li>
}

export const MenuItem = ({
  children,
  className,
  onClose,
  ...rest
}: TMenuItemProps) => {
  const defaultClassName =
    'text-left font-medium px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-tertiary-900 active:bg-indigo-100'
  const allClassNames = clsx(defaultClassName, className)

  if (rest.menuItemAs === EMenuItemAs.LINK) {
    return (
      <li className="flex flex-col items-stretch" onClick={onClose}>
        <Link {...rest}>
          <a className={allClassNames}>{children}</a>
        </Link>
      </li>
    )
  }

  return (
    <li className="flex flex-col items-stretch" onClick={onClose}>
      <button type="button" className={allClassNames} {...rest}>
        {children}
      </button>
    </li>
  )
}
