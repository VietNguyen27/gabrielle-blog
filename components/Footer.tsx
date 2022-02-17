import React from 'react'
import Anchor from './Anchor'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from '../public/logo.png'
import Button, { EButtonAs, EButtonSizes, EButtonVariants } from './Button'
import Link from 'next/link'

const footerLinks = [
  {
    href: '/#',
    title: 'Culture',
  },
  {
    href: '/#',
    title: 'Self',
  },
  {
    href: '/#',
    title: 'Relationships',
  },
  {
    href: '/#',
    title: 'Data Science',
  },
  {
    href: '/#',
    title: 'Programming',
  },
  {
    href: '/#',
    title: 'Health',
  },
  {
    href: '/#',
    title: 'Politics',
  },
]

const footerBottomLinks = [
  {
    href: '/privacy-policy',
    title: 'Privacy Policy',
  },
  {
    href: '/cookie-policy',
    title: 'Cookie Policy',
  },
  {
    href: '/contact',
    title: 'Contact Us',
  },
]

const Footer = () => {
  const { pathname } = useRouter()

  return (
    <footer className="h-footer overflow-hidden bg-background-darker">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-10">
          <h2 className="mr-6 text-4xl font-bold">
            Join a network of curious minds.
          </h2>
          <Button
            EButtonAs={EButtonAs.LINK}
            href="/register"
            variant={EButtonVariants.TERTIARY}
            size={EButtonSizes.LARGE}
          >
            Let's begin
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center border-t border-divider pt-8 pb-4">
          <Link href="/">
            <a className="cursor-pointer">
              <Image alt="Gabrielle logo" src={logo} width={120} height={20} />
            </a>
          </Link>
          <div className="ml-12 flex items-center">
            {footerLinks.map(({ href, title }, index) => (
              <Anchor
                key={index}
                href={href}
                active={pathname === href}
                className="mr-4 text-sm last:mr-0"
              >
                {title}
              </Anchor>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <div className="flex items-center">
            {footerBottomLinks.map(({ href, title }, index) => (
              <Anchor
                key={index}
                href={href}
                active={pathname === href}
                className="text-sm"
                suffix={
                  index < footerBottomLinks.length - 1 && (
                    <span className="mx-2.5 h-1 w-1 rounded-full bg-text"></span>
                  )
                }
              >
                {title}
              </Anchor>
            ))}
          </div>
          <div className="text-sm">
            &copy; Gabrielle {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
