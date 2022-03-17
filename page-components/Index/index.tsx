import { Container, Sidebar } from '@components/Layout'
import { Post, TrendingPost } from '@components/Post'
import { TrendingUpIcon } from '@heroicons/react/outline'
import { Button, EButtonAs } from '@components/Button'
import { Heading } from '@components/Heading'
import HeroImg from '@public/static/images/hero.png'

import UserImg1 from '@public/static/images/dummy-user-1.jpeg'
import UserImg2 from '@public/static/images/dummy-user-2.jpeg'

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

const Home = ({ posts }) => {
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
          <div className="relative flex items-start">
            <div className="sticky top-20 hidden w-[200px] px-2 md:block lg:w-[240px]">
              <Sidebar />
            </div>
            <div className="flex flex-1 flex-col items-stretch">
              {posts &&
                posts.map((post, index) => (
                  <Post key={post._id} {...post} hasCover={index === 0} />
                ))}
            </div>
            <div className="sticky top-20 hidden w-1/4 px-2 lg:block">
              <Heading level={2} className="pl-4 text-lg capitalize">
                Popular tags
              </Heading>
              <nav className="mt-2 pr-2">
                <ul className="flex flex-col gap-y-2 pb-4">
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
