import React, { Fragment } from 'react'
import HomeIcon from '@public/static/images/nav-home.png'
import WriteIcon from '@public/static/images/nav-write.png'
import TopicsIcon from '@public/static/images/nav-topics.png'
import BookmarksIcon from '@public/static/images/nav-bookmarks.png'
import FaqIcon from '@public/static/images/nav-faq.png'
import AboutIcon from '@public/static/images/nav-about.png'
import ContactIcon from '@public/static/images/nav-contact.png'
import TermsIcon from '@public/static/images/nav-terms.png'
import PolicyIcon from '@public/static/images/nav-policy.png'
import Link from 'next/link'
import { ImageRatio } from '@components/ImageRatio'
import { socials } from './Footer'
import { useRouter } from 'next/router'
import { LoginRequired } from '@components/LoginRequired'
import { useAuth } from '@hooks/useAuth'
import { useModal } from '@hooks/useModal'

const navs = [
  {
    items: [
      {
        slug: '/',
        label: 'Home',
        icon: HomeIcon,
      },
      {
        slug: '/write',
        label: 'Write',
        icon: WriteIcon,
        requiredLogin: true,
      },
      {
        slug: '/topics',
        label: 'Topics',
        icon: TopicsIcon,
      },
      {
        slug: '/bookmarks',
        label: 'Bookmarks',
        icon: BookmarksIcon,
        requiredLogin: true,
      },
      {
        slug: '/faq',
        label: 'FAQ',
        icon: FaqIcon,
      },
      {
        slug: '/about',
        label: 'About',
        icon: AboutIcon,
      },
      {
        slug: '/contact',
        label: 'Contact',
        icon: ContactIcon,
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        slug: '/terms',
        label: 'Terms of Use',
        icon: TermsIcon,
      },
      {
        slug: '/policy',
        label: 'Privacy Policy',
        icon: PolicyIcon,
      },
    ],
  },
]

const Sidebar = () => {
  const { open, toggle } = useModal()
  const isAuth = useAuth()
  const router = useRouter()

  const onClick = (pathname) => {
    if (!isAuth) {
      toggle()
      return
    }
    router.push({
      pathname,
    })
  }

  return (
    <LoginRequired open={open} toggle={toggle}>
      <div>
        {navs.map(({ title, items }, index) => (
          <Fragment key={index}>
            {title && <h2 className="px-2 pb-2 text-lg font-bold">{title}</h2>}
            <nav className="pb-4">
              <ul className="flex flex-col items-stretch gap-1">
                {items.map((link, index) => {
                  const { slug, label, icon, requiredLogin } = link

                  if (requiredLogin) {
                    return (
                      <li key={index}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 rounded-sm px-3 py-2 hover:bg-indigo-50 hover:text-tertiary-900 focus:bg-indigo-100 focus-visible:outline-tertiary-500"
                          onClick={() => onClick(slug)}
                        >
                          <ImageRatio src={icon.src} className="w-5" />
                          {label}
                        </button>
                      </li>
                    )
                  }

                  return (
                    <li key={index}>
                      <Link href={slug}>
                        <a className="flex items-center gap-3 rounded-sm px-3 py-2 hover:bg-indigo-50 hover:text-tertiary-900 focus:bg-indigo-100 focus-visible:outline-tertiary-500">
                          <ImageRatio src={icon.src} className="w-5" />
                          {label}
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </Fragment>
        ))}
        <div className="flex items-center gap-4 pt-2 pl-3">
          {socials.map(({ slug, img: Image }, index) => (
            <Link href={slug} key={index}>
              <a>
                <Image alt="social icon" />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </LoginRequired>
  )
}

export default Sidebar
