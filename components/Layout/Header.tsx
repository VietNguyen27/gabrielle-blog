import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { MenuAlt2Icon } from '@heroicons/react/outline'
import { Logo } from '@components/Logo'
import { saveUserToLocalStorage, useCurrentUser } from '@lib/user'
import { useLocalUser } from '@hooks/index'
import Container from './Container'
import Navbar from './Navbar'
import NavDrawer from './NavDrawer'

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<any>(null)
  const { data: { user } = {} } = useCurrentUser()
  const localUser = useLocalUser()

  useEffect(() => {
    if (user && !localUser) {
      saveUserToLocalStorage(user)
    }

    const handleScroll = () => {
      if (ref.current) {
        const headerHeight = ref.current.clientHeight
        const scrollTop = window.scrollY
        const isSticky = scrollTop - headerHeight / 1.5 > 0

        setIsSticky(isSticky)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchmove', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [user, localUser])

  return (
    <>
      <header
        className={clsx(
          'z-popover flex items-center bg-white',
          isSticky
            ? 'fixed bottom-[calc(100%+1px)] left-0 right-0 animate-slide-down py-4 shadow-md'
            : 'relative py-7'
        )}
        ref={ref}
      >
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            <Navbar />
            <button
              className="inline-flex items-center gap-1 font-semibold md:hidden"
              onClick={() => setOpen(true)}
            >
              Menu
              <MenuAlt2Icon className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>
      <NavDrawer open={open} onClose={() => setOpen(false)} />
      <div className={isSticky ? 'h-header' : 'hidden'}></div>
    </>
  )
}
export default Header
