import { Container } from '@components/Layout'
import { Post, PostLarge, TrendingPost } from '@components/Post'
import { TrendingUpIcon } from '@heroicons/react/outline'
import { Button, EButtonAs } from '@components/Button'
import { Heading } from '@components/Heading'
import HeroImg from '@public/static/images/hero.png'

import BlogImg1 from '@public/static/images/dummy-blog-1.png'
import BlogImg2 from '@public/static/images/dummy-blog-2.png'
import UserImg1 from '@public/static/images/dummy-user-1.jpeg'
import UserImg2 from '@public/static/images/dummy-user-2.jpeg'

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

const dummyTrendingPosts = [
  {
    title: "Finding the I's in Product Development",
    author: {
      displayName: 'Catarina Ricca',
      photoURL: UserImg1,
      position: 'Product Owner',
    },
    createdAt: 'February 9, 2022',
  },
  {
    title: 'Yarn, npm, or pnpm?',
    author: {
      displayName: 'Gil Mendes',
      photoURL: UserImg2,
      position: 'Principal Developer',
    },
    createdAt: 'January 17, 2022',
  },
]

const dummyTags = [
  {
    slug: '/#',
    label: 'Culture',
  },
  {
    slug: '/#',
    label: 'Self',
  },
  {
    slug: '/#',
    label: 'Relationships',
  },
  {
    slug: '/#',
    label: 'Data Science',
  },
  {
    slug: '/#',
    label: 'Programming',
  },
  {
    slug: '/#',
    label: 'Health',
  },
  {
    slug: '/#',
    label: 'Politics',
  },
]

const Home = () => {
  return (
    <>
      <section className="border-divider mb-6 overflow-x-hidden border-t border-b">
        <Container>
          <div className="min-h-auto relative my-12 flex items-center md:min-h-[50vh]">
            <div className="w-full sm:w-2/3 lg:w-1/2">
              <h1 className="mb-2 text-3xl leading-tight sm:text-5xl">
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
                className="rounded-3xl px-5 py-2.5"
              >
                Start writing
              </Button>
            </div>
            <img
              src={HeroImg.src}
              alt="hero of gabrielle"
              className="absolute top-1/2 -right-1/4 -z-10 hidden h-full w-1/2 min-w-[450px] -translate-y-1/2 object-contain sm:block lg:-right-16"
            />
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container className="border-gray-2 border-b pb-12">
          <Heading level={2} className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 rounded-full border border-gray-800 p-0.5" />
            Trending on Gabrielle
          </Heading>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-2 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6).keys()].map((_, index) => {
              const post = dummyTrendingPosts[(index + 1) % 2]
              return <TrendingPost key={index} numOrder={index + 1} {...post} />
            })}
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="relative flex flex-col items-start gap-0 xl:flex-row xl:gap-8">
            <div className="order-2 w-full xl:order-1 xl:w-3/4">
              <div className="mt-4 mb-14">
                <PostLarge {...dummyPosts[0]} />
              </div>
              <div className="mb-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
                {[...Array(8).keys()].map((_, index) => {
                  const post = dummyPosts[(index + 1) % 2]

                  return <Post key={index} {...post} />
                })}
              </div>
            </div>
            <div className="static top-20 order-1 w-full xl:sticky xl:order-2 xl:w-1/4">
              <Heading className="text-lg capitalize">Popular tags</Heading>
              <nav className="mt-2 pr-2">
                <ul className="flex flex-row gap-y-2 overflow-y-auto pb-4 xl:flex-col">
                  {dummyTags.map(({ slug, label }, index) => (
                    <li key={index}>
                      <a
                        href={slug}
                        className="text-md flex whitespace-nowrap rounded px-4 py-2 hover:bg-gray-100 hover:underline"
                      >
                        #{label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Home
