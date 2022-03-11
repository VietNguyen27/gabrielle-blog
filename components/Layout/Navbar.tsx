import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Container from './Container'
import { Anchor } from '@components/Anchor'
import {
  Button,
  EButtonAs,
  EButtonRounded,
  EButtonSizes,
  EButtonVariants,
} from '@components/Button'
import clsx from 'clsx'
import { useCurrentUser } from '@lib/user'
import { fetcher } from '@lib/fetcher'
import { BellIcon } from '@heroicons/react/outline'
import {
  Dropdown,
  EMenuItemAs,
  Menu,
  MenuDivider,
  MenuItem,
} from '@components/Dropdown'
import Link from 'next/link'

type TMenuToggle = {
  active: boolean
  toggle: any
}

const navLinks = [
  {
    slug: '/',
    label: 'Home',
  },
  {
    slug: '/about',
    label: 'About',
  },
  {
    slug: '/write',
    label: 'Write',
  },
  {
    slug: '/login',
    label: 'Sign In',
    hideWhenLoggedIn: true,
  },
]

const variants = {
  open: {
    opacity: 1,
    display: 'block',
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  closed: {
    opacity: 0,
    display: 'none',
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
      when: 'afterChildren',
    },
  },
}

const navLinkVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000 },
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
}

const MenuToggle = ({ active, toggle }: TMenuToggle) => {
  return (
    <button
      className="flex items-center justify-end md:hidden"
      onClick={() => toggle((prevState) => !prevState)}
    >
      <div className="mr-2 flex flex-col gap-1">
        <div
          className={clsx(
            'relative h-0.5 w-3.5 origin-top-right rounded bg-gray-800 transition-transform',
            active && 'bottom-px -rotate-45'
          )}
        ></div>
        <div
          className={clsx(
            'relative h-0.5 w-3.5 origin-bottom-right rounded bg-gray-800 transition-transform',
            active && 'top-0.5 rotate-45'
          )}
        ></div>
      </div>
      <span className="text-xl font-semibold text-gray-800">
        {active ? 'Close' : 'Menu'}
      </span>
    </button>
  )
}

const MenuDropdown = ({ username, email }, onLogOut) => {
  return (
    <Menu className="w-[250px]">
      <MenuItem href="/#" menuItemAs={EMenuItemAs.LINK}>
        <p className="font-semibold line-clamp-1">{username}</p>
        <span className="text-sm line-clamp-1">{email}</span>
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/#" menuItemAs={EMenuItemAs.LINK}>
        Create Post
      </MenuItem>
      <MenuItem href="/#" menuItemAs={EMenuItemAs.LINK}>
        Bookmark
      </MenuItem>
      <MenuItem href="/#" menuItemAs={EMenuItemAs.LINK}>
        Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={onLogOut}>Sign Out</MenuItem>
    </Menu>
  )
}

const Navbar = () => {
  const { pathname } = useRouter()
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)
  const { data: { user } = {}, mutate } = useCurrentUser()

  const onLogOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      })
      mutate({ user: null })
    } catch (error) {
      console.log(error)
    }
  }, [mutate])

  return (
    <nav className="flex items-center">
      <ul className="hidden items-center gap-6 text-base transition md:flex">
        {navLinks.map(({ slug, label, hideWhenLoggedIn }, index) => {
          if (!(user && hideWhenLoggedIn)) {
            return (
              <li key={index}>
                <Anchor href={slug} active={pathname === slug}>
                  {label}
                </Anchor>
              </li>
            )
          }
        })}
        {!user && (
          <li>
            <Button
              href="/register"
              buttonAs={EButtonAs.LINK}
              className="rounded-3xl px-4 py-2"
            >
              Get in touch
            </Button>
          </li>
        )}
      </ul>
      <MenuToggle active={isMenuExpanded} toggle={setIsMenuExpanded} />
      {user && (
        <ul className="flex items-center gap-2 pl-3">
          <li>
            <Button
              href="/register"
              buttonAs={EButtonAs.LINK}
              variant={EButtonVariants.QUATERNARY}
              className="p-2"
            >
              <BellIcon className="h-6 w-6" />
            </Button>
          </li>
          <li>
            <Dropdown overlay={MenuDropdown(user, onLogOut)}>
              <Button variant={EButtonVariants.QUATERNARY} className="p-1">
                <span className="relative h-8 w-8">
                  <img
                    src={user.profilePicture}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                  />
                </span>
              </Button>
            </Dropdown>
          </li>
        </ul>
      )}
      <motion.div
        className="absolute top-full left-0 block h-screen w-full overflow-hidden bg-white shadow-md transition-opacity md:hidden"
        initial={false}
        variants={variants}
        animate={isMenuExpanded ? 'open' : 'closed'}
      >
        <Container>
          <ul className="flex flex-col gap-4 px-4 pb-6 pt-4 text-2xl">
            {navLinks.map(({ slug, label, hideWhenLoggedIn }, index) => {
              if (!(user && hideWhenLoggedIn)) {
                return (
                  <motion.li key={index} variants={navLinkVariants}>
                    <Anchor href={slug} active={pathname === slug}>
                      {label}
                    </Anchor>
                  </motion.li>
                )
              }
            })}
            {!user && (
              <motion.li variants={navLinkVariants}>
                <Button
                  href="/register"
                  buttonAs={EButtonAs.LINK}
                  className="rounded-3xl px-4 py-2"
                >
                  Get in touch
                </Button>
              </motion.li>
            )}
          </ul>
        </Container>
      </motion.div>
    </nav>
  )
}

export default Navbar
