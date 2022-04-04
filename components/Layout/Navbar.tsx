import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Anchor } from '@components/Anchor'
import { Button } from '@components/Button'
import { removeUserToLocalStorage, useCurrentUser } from '@lib/user'
import { fetcher } from '@lib/fetcher'
import { BellIcon } from '@heroicons/react/outline'
import { Dropdown, Menu, MenuDivider, MenuItem } from '@components/Dropdown'
import { Avatar } from '@components/Avatar'

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
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null

  const onLogOut = useCallback(async () => {
    await fetcher('/api/auth', {
      method: 'DELETE',
    })
    router.push('/')
    mutate({ user: null })
    removeUserToLocalStorage()
  }, [mutate])

  return (
    <nav className="hidden items-center xs:flex">
      <ul className="flex items-center gap-2 pl-3 sm:gap-4">
        {!localUser ? (
          <>
            <li>
              <Anchor href="/login" active={router.pathname === '/login'}>
                Sign in
              </Anchor>
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
              <Anchor href="/write" active={router.pathname === '/write'}>
                Write
              </Anchor>
            </li>
            <li>
              <Button
                href="/notifications"
                as="a"
                variant="quaternary"
                className="p-2"
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
