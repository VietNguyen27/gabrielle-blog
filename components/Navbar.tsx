import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import Anchor from './Anchor'
import { useRouter } from 'next/router'
import Button, { EButtonAs } from './Button'
import clsx from 'clsx'
import Link from 'next/link'

const navLinks = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/about',
    title: 'About',
  },
  {
    href: '/write',
    title: 'Write',
  },
  {
    href: '/sign-in',
    title: 'Sign In',
  },
]

const Navbar = () => {
  const { pathname } = useRouter()
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
    <header
      className={clsx(
        'overflow-hidden',
        isSticky
          ? 'fixed bottom-full left-0 right-0 h-header-sticky animate-slide-down py-4 shadow-md'
          : 'h-header py-8'
      )}
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="cursor-pointer">
              <Image alt="Gabrielle logo" src={logo} width={120} height={20} />
            </a>
          </Link>
          <nav>
            <ul className="flex items-center">
              {navLinks.map(({ href, title }, index) => (
                <li key={index}>
                  <Anchor
                    href={href}
                    active={pathname === href}
                    className="mr-6"
                  >
                    {title}
                  </Anchor>
                </li>
              ))}
              <li>
                <Button href="/register" EButtonAs={EButtonAs.LINK}>
                  Get in touch
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
