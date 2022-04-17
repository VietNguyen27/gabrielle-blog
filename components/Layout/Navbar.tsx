import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { BellIcon } from '@heroicons/react/outline'
import { NavLink } from '@components/NavLink'
import { Button } from '@components/Button'
import { Dropdown, Menu, MenuDivider, MenuItem } from '@components/Dropdown'
import { Avatar } from '@components/Avatar'
import { fetcher } from '@lib/fetcher'
import { removeUserToLocalStorage, useCurrentUser } from '@lib/user'
import { useLocalUser } from '@hooks/index'

const MenuDropdown = ({ username, email }, onLogOut) => {
  return (
    <Menu className="w-[250px]">
      <MenuItem href={`/${username}`} as="a">
        <div className="flex flex-col">
          <p className="font-semibold line-clamp-1">{username}</p>
          <span className="text-sm line-clamp-1">{email}</span>
        </div>
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/dashboard" as="a">
        Dashboard
      </MenuItem>
      <MenuItem href="/write" as="a">
        Create Post
      </MenuItem>
      <MenuItem href="/bookmarks" as="a">
        Bookmarks
      </MenuItem>
      <MenuItem href="/settings" as="a">
        Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={onLogOut}>Sign Out</MenuItem>
    </Menu>
  )
}

const Navbar = () => {
  const router = useRouter()
  const { mutate } = useCurrentUser()
  const localUser = useLocalUser()

  const onLogOut = useCallback(async () => {
    await fetcher('/api/auth', {
      method: 'DELETE',
    })
    router.push('/')
    mutate({ user: null })
    removeUserToLocalStorage()
  }, [mutate])

  return (
    <nav className="hidden items-center md:flex">
      <ul className="flex items-center gap-2 pl-3 sm:gap-4">
        {!localUser ? (
          <>
            <li>
              <NavLink href="/login" active={router.pathname === '/login'}>
                Sign in
              </NavLink>
            </li>
            <li>
              <Button
                as="a"
                href="/register"
                target="_blank"
                className="rounded-3xl px-2 py-2 xs:px-4"
              >
                Create account
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink href="/write" active={router.pathname === '/write'}>
                Write
              </NavLink>
            </li>
            <li>
              <Button
                href="/notifications"
                as="a"
                variant="quaternary"
                className="p-2"
                aria-label="Notifications"
              >
                <BellIcon className="h-6 w-6" />
              </Button>
            </li>
            <li>
              <Dropdown overlay={MenuDropdown(localUser, onLogOut)}>
                <Button variant="quaternary" className="rounded-full p-1">
                  <Avatar
                    src={localUser.profilePicture}
                    alt={localUser.username}
                    className="w-8"
                  />
                </Button>
              </Dropdown>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
