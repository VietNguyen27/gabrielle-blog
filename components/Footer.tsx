import React from 'react'
import Anchor from './Anchor'
import { useRouter } from 'next/router'
import Button, { EButtonAs, EButtonSizes, EButtonVariants } from './Button'
import Container from './Container'
import Logo from './Logo'

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
    href: '/privacy',
    title: 'Privacy Policy',
  },
  {
    href: '/terms',
    title: 'Terms Of Use',
  },
  {
    href: '/contact',
    title: 'Contact Us',
  },
]

const Footer = () => {
  const { pathname } = useRouter()

  return (
    <footer className="min-h-footer overflow-hidden bg-background-darker">
      <Container>
        <div className="flex flex-col items-center justify-center py-6 text-center lg:flex-row lg:py-10">
          <h2 className="mr-0 mb-2 text-4xl font-bold lg:mb-0 lg:mr-6">
            Join a network of curious minds.
          </h2>
          <Button
            buttonAs={EButtonAs.LINK}
            href="/register"
            variant={EButtonVariants.TERTIARY}
            size={EButtonSizes.LARGE}
          >
            Let's begin
          </Button>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col items-start border-t border-divider pt-4 pb-2 md:flex-row md:items-center lg:pt-8 lg:pb-4">
          <Logo />
          <div className="ml-0 mt-2 flex flex-wrap items-center gap-y-1 md:ml-12 md:mt-0">
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
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
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
      </Container>
    </footer>
  )
}

export default Footer
