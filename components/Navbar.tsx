import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import Anchor from './Anchor'
import { useRouter } from 'next/router'
import Button, { EButtonAs, EButtonSizes } from './Button'
import clsx from 'clsx'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

const menuVariants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: 1 },
  },
}

const menuItemVariants = {
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

const Navbar = () => {
  const { pathname } = useRouter()
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)
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
            : 'relative min-h-header py-8'
        )}
        ref={ref}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="cursor-pointer">
                <Image
                  alt="Gabrielle logo"
                  src={logo}
                  width={120}
                  height={20}
                />
              </a>
            </Link>
            <nav>
              <ul className="hidden items-center gap-6 overflow-hidden text-base transition md:flex">
                {navLinks.map(({ href, title }, index) => (
                  <li key={index}>
                    <Anchor href={href} active={pathname === href}>
                      {title}
                    </Anchor>
                  </li>
                ))}
                <li>
                  <Button href="/register" buttonAs={EButtonAs.LINK}>
                    Get in touch
                  </Button>
                </li>
              </ul>
              <motion.div
                className="absolute top-full left-0 block h-screen w-full overflow-hidden bg-white shadow-md transition-opacity md:hidden"
                initial={false}
                variants={menuVariants}
                animate={isMenuExpanded ? 'open' : 'closed'}
              >
                <div className="container mx-auto px-4">
                  <ul className="flex flex-col gap-4 px-4 pb-6 pt-4 text-2xl">
                    {navLinks.map(({ href, title }, index) => (
                      <motion.li key={index} variants={menuItemVariants}>
                        <Anchor href={href} active={pathname === href}>
                          {title}
                        </Anchor>
                      </motion.li>
                    ))}
                    <motion.li variants={menuItemVariants}>
                      <Button
                        href="/register"
                        buttonAs={EButtonAs.LINK}
                        size={EButtonSizes.EXTRA_LARGE}
                      >
                        Get in touch
                      </Button>
                    </motion.li>
                  </ul>
                </div>
              </motion.div>
              <div className="flex items-center justify-end md:hidden">
                <div className="mr-2 flex flex-col gap-1">
                  <div
                    className={clsx(
                      'relative h-0.5 w-3.5 origin-top-right rounded bg-heading transition-transform',
                      isMenuExpanded && 'bottom-px -rotate-45'
                    )}
                  ></div>
                  <div
                    className={clsx(
                      'relative h-0.5 w-3.5 origin-bottom-right rounded bg-heading transition-transform',
                      isMenuExpanded && 'top-0.5 rotate-45'
                    )}
                  ></div>
                </div>
                <button
                  className="text-xl font-semibold text-heading"
                  onClick={() => setIsMenuExpanded((prevState) => !prevState)}
                >
                  {isMenuExpanded ? 'Close' : 'Menu'}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className={isSticky ? 'h-header' : 'hidden'}></div>
    </>
  )
}
export default Navbar
