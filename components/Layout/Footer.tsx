import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from './Container'
import { Button } from '@components/Button'
import { Logo } from '@components/Logo'
import { Anchor } from '@components/Anchor'
import TwitterLogo from '@public/static/images/twitter-logo.svg'
import DribbbleLogo from '@public/static/images/dribbble-logo.svg'
import InstagramLogo from '@public/static/images/instagram-logo.svg'
import FacebookLogo from '@public/static/images/facebook-logo.svg'
import { useCurrentUser } from '@lib/user'

export const socials = [
  {
    slug: '/#',
    img: TwitterLogo,
  },
  {
    slug: '/#',
    img: DribbbleLogo,
  },
  {
    slug: '/#',
    img: InstagramLogo,
  },
  {
    slug: '/#',
    img: FacebookLogo,
  },
]

export const links = [
  {
    slug: '/policy',
    label: 'Privacy Policy',
  },
  {
    slug: '/terms',
    label: 'Terms Of Use',
  },
  {
    slug: '/contact',
    label: 'Contact Us',
  },
]

const Footer = () => {
  const { pathname } = useRouter()
  const { data: { user } = {} } = useCurrentUser()

  return (
    <footer className="overflow-hidden bg-gray-100">
      {!user && (
        <Container>
          <div className="border-divider flex flex-col items-center justify-center border-b py-6 text-center lg:flex-row lg:py-10">
            <h2 className="mr-0 mb-2 text-4xl font-bold lg:mb-0 lg:mr-6">
              Join a network of curious minds.
            </h2>
            <Button
              as="a"
              href="/register"
              variant="tertiary"
              className="rounded-3xl px-5 py-2.5"
            >
              Let&apos;s begin
            </Button>
          </div>
        </Container>
      )}
      <Container className="py-6">
        <div className="flex items-end justify-between pb-4 md:flex-row md:items-center">
          <Logo />
          <div className="flex items-center gap-4">
            {socials.map(({ slug, img: Image }, index) => (
              <Link href={slug} key={index}>
                <a>
                  <Image alt="social icon" />
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center">
            {links.map(({ slug, label }, index) => (
              <Anchor
                key={index}
                href={slug}
                active={pathname === slug}
                className="text-sm"
                suffix={
                  index < links.length - 1 && (
                    <span className="bg-text mx-2.5 h-1 w-1 rounded-full"></span>
                  )
                }
              >
                {label}
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
