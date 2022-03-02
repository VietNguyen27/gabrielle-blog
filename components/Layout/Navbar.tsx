import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Container from './Container'
import { Anchor } from '@components/Anchor'
import { Button, EButtonAs, EButtonSizes } from '@components/Button'
import clsx from 'clsx'

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
  },
]

const variants = {
  open: {
    opacity: 1,
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

const Navbar = () => {
  const { pathname } = useRouter()
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)

  return (
    <nav>
      <ul className="hidden items-center gap-6 overflow-hidden text-base transition md:flex">
        {navLinks.map(({ slug, label }, index) => (
          <li key={index}>
            <Anchor href={slug} active={pathname === slug}>
              {label}
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
        variants={variants}
        animate={isMenuExpanded ? 'open' : 'closed'}
      >
        <Container>
          <ul className="flex flex-col gap-4 px-4 pb-6 pt-4 text-2xl">
            {navLinks.map(({ slug, label }, index) => (
              <motion.li key={index} variants={navLinkVariants}>
                <Anchor href={slug} active={pathname === slug}>
                  {label}
                </Anchor>
              </motion.li>
            ))}
            <motion.li variants={navLinkVariants}>
              <Button
                href="/register"
                buttonAs={EButtonAs.LINK}
                size={EButtonSizes.EXTRA_LARGE}
              >
                Get in touch
              </Button>
            </motion.li>
          </ul>
        </Container>
      </motion.div>
      <MenuToggle active={isMenuExpanded} toggle={setIsMenuExpanded} />
    </nav>
  )
}

export default Navbar
