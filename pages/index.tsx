import type { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '@components/Layout'
import { Post, PostLarge } from '@components/Post'
import Container from '@components/Container'
import HeroImg from '../public/hero.png'

import BlogImg1 from '../public/dummy-blog-1.png'
import BlogImg2 from '../public/dummy-blog-2.png'
import UserImg1 from '../public/dummy-user-1.jpeg'
import UserImg2 from '../public/dummy-user-2.jpeg'
import Button, { EButtonAs, EButtonSizes } from '@components/Button'

const dummyPosts = [
  {
    title: "Finding the I's in Product Development",
    subTitle:
      'This article will provide an overview of how you can benefit from using a feature toggle and how you can implement it into your development or production environments.',
    coverImg: BlogImg1,
    tag: 'Product',
    author: {
      displayName: 'Catarina Ricca',
      photoURL: UserImg1,
      position: 'Product Owner',
    },
    createdAt: 'February 9, 2022',
  },
  {
    title: 'Yarn, npm, or pnpm?',
    subTitle:
      'Yarn is probably the most used alternative, but lately is becoming slower. The newest kid in town, pnpm, was a new way to manage package cache that makes it faster on installing/upgrading packages.',
    coverImg: BlogImg2,
    tag: 'Development',
    author: {
      displayName: 'Gil Mendes',
      photoURL: UserImg2,
      position: 'Principal Developer',
    },
    createdAt: 'January 17, 2022',
  },
]

const Home = () => {
  return (
    <>
      <Head>
        <title>Gabrielle</title>
        <meta
          name="description"
          content="Gabrielle is a website which provides Blogging tips, Technology news and reviews, plus you can create your own blog to share interesting knowledge with everyone."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="mb-6 border-t border-b border-divider">
        <Container>
          <div className="relative flex min-h-[50vh] items-center">
            <div className="w-full py-14 sm:w-2/3 lg:w-1/2">
              <h1 className="mb-2 text-5xl leading-tight">
                Welcome to Gabrielle, a good place to write, read, and connect
                with people.
              </h1>
              <p className="mb-6 text-lg">
                It's easy and free to sharing your knowledge, thinking on any
                topic and connect with another readers.
              </p>
              <Button
                href="/write"
                buttonAs={EButtonAs.LINK}
                size={EButtonSizes.LARGE}
              >
                Start writing
              </Button>
            </div>
            <img
              src={HeroImg.src}
              alt="hero of gabrielle"
              className="absolute top-1/2 right-0 -z-10 hidden h-full w-1/2 min-w-[450px] -translate-y-1/2 object-contain sm:block"
            />
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className="flex items-center justify-between"></div>
          <div className="mt-4 mb-14">
            <PostLarge {...dummyPosts[0]} />
          </div>
          <div className="mb-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
            {[...Array(2).keys()].map((_, index) => {
              const post = dummyPosts[index % 2]

              return <Post key={index} {...post} />
            })}
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9).keys()].map((_, index) => {
              const post = dummyPosts[(index + 3) % 2]

              return <Post key={index} {...post} />
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
