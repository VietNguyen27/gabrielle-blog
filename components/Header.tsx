import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Container from './Container'
import Logo from './Logo'
import Navbar from './Navbar'

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const ref = useRef<any>(null)

  useEffect(() => {
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
  }, [])

  return (
    <>
      <header
        className={clsx(
          'z-50 flex items-center bg-background',
          isSticky
            ? 'fixed bottom-[calc(100%+1px)] left-0 right-0  min-h-header-sticky animate-slide-down py-4 shadow-md'
            : 'py-7.5 relative min-h-header'
        )}
        ref={ref}
      >
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            <Navbar />
          </div>
        </Container>
      </header>
      <div className={isSticky ? 'h-header' : 'hidden'}></div>
    </>
  )
}
export default Header
