import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import Navbar from './Navbar'
import { Logo } from '@components/Logo'
import clsx from 'clsx'
import { MenuAlt2Icon } from '@heroicons/react/outline'
import NavDrawer from './NavDrawer'
import { saveUserToLocalStorage, useCurrentUser } from '@lib/user'

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<any>(null)
  const { data: { user } = {} } = useCurrentUser()
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [user, localUser])

  return (
    <>
      <header
        className={clsx(
          'z-50 flex items-center bg-white',
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
              className="inline-flex items-center gap-1 font-semibold xs:hidden"
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
