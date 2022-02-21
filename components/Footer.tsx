import React from 'react'
import Anchor from './Anchor'
import { useRouter } from 'next/router'
import Button, { EButtonAs, EButtonSizes, EButtonVariants } from './Button'
import Container from './Container'
import Logo from './Logo'
import Link from 'next/link'
import Image from 'next/image'
import { socials, links } from '@data/footer'

const Footer = () => {
  const { pathname } = useRouter()

  return (
    <footer className="min-h-footer overflow-hidden bg-gray-100">
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
        <div className="border-divider flex items-end justify-between border-t pt-4 pb-2 md:flex-row md:items-center lg:pt-8 lg:pb-4">
          <Logo />
          <div className="flex items-center gap-4">
            {socials.map(({ slug, img }, index) => (
              <Link href={slug} key={index}>
                <a>
                  <Image src={img} />
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
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
