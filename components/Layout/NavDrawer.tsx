import React, { useCallback } from 'react'
import { Drawer } from '@components/Drawer'
import Sidebar from './Sidebar'
import Link from 'next/link'
import { removeUserToLocalStorage, useCurrentUser } from '@lib/user'
import { ImageRatio } from '@components/ImageRatio'
import { fetcher } from '@lib/fetcher'
import { Button } from '@components/Button'

type TNavDrawerProps = {
  open: boolean
  onClose: () => void
}

const NavDrawer = ({ open, onClose }: TNavDrawerProps) => {
  const { data: { user } = {}, mutate } = useCurrentUser()

  const onLogOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      })
      removeUserToLocalStorage()
      mutate({ user: null })
    } catch (error) {
      console.log(error)
    }
  }, [mutate])

  return (
    <Drawer open={open} onClose={onClose} className="w-[240px]">
      <nav className="pb-2">
        <ul>
          {user ? (
            <>
              <li>
                <Link href={`/${user.username}`}>
                  <a className="flex items-center gap-3 rounded-sm px-3 py-2 font-medium hover:bg-indigo-50 hover:text-tertiary-900 active:bg-indigo-100">
                    <ImageRatio
                      src={user.profilePicture}
                      className="w-[20px] rounded-full border border-gray-200"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold line-clamp-1">
                        {user.username}
                      </p>
                      <span className="text-sm line-clamp-1">{user.email}</span>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/notifications">
                  <a className="flex items-center gap-3 rounded-sm px-3 py-2 pl-11 font-medium hover:bg-indigo-50 hover:text-tertiary-900 active:bg-indigo-100">
                    Notifications
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/bookmarks">
                  <a className="flex items-center gap-3 rounded-sm px-3 py-2 pl-11 font-medium hover:bg-indigo-50 hover:text-tertiary-900 active:bg-indigo-100">
                    Bookmarks
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <a className="flex items-center gap-3 rounded-sm px-3 py-2 pl-11 font-medium hover:bg-indigo-50 hover:text-tertiary-900 active:bg-indigo-100">
                    Settings
                  </a>
                </Link>
              </li>
              <li>
                <button
                  className="flex w-full items-center gap-3 rounded-sm px-3 py-2 pl-11 font-medium hover:bg-indigo-50 hover:text-tertiary-900 active:bg-indigo-100"
                  onClick={onLogOut}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 pb-2">
                <Button
                  href="/login"
                  as="a"
                  variant="secondary"
                  className="rounded-md px-2 py-2 xs:px-4"
                  fluid
                >
                  Sign in
                </Button>
              </li>
              <li className="px-3 pb-2">
                <Button
                  href="/register"
                  as="a"
                  className="rounded-md px-2 py-2 xs:px-4"
                  fluid
                >
                  Create account
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Sidebar />
    </Drawer>
  )
}

export default NavDrawer
