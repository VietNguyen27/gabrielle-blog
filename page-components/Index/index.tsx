import { Container, Sidebar } from '@components/Layout'
import { PostCard, TrendingPost } from '@components/Post'
import { TrendingUpIcon } from '@heroicons/react/outline'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import { useInfinitePosts } from '@lib/post'
import { useCurrentUser } from '@lib/user'
import useOnScreen from '@hooks/useOnScreen'
import { Fragment, useEffect, useRef } from 'react'
import { useTopics } from '@lib/topic'
import {
  PostCardSkeleton,
  TopicPopularSkeleton,
  TrendingPostSkeleton,
} from '@components/Skeleton'
import { TopicPopular } from '@components/Topic'
import HeroImg from '@public/static/images/hero.png'
import { Logo } from '@components/Logo'
import { ALink } from '@components/ALink'

const Home = () => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const { data: { user } = {} } = useCurrentUser()
  const { data: { topics } = {} } = useTopics(10)
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfinitePosts()
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : []

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

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
              <Button href="/write" as="a" className="rounded-3xl px-5 py-2.5">
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
            {posts && posts.length
              ? posts
                  .slice(0, 6)
                  .map((post, index) => (
                    <TrendingPost
                      key={post._id}
                      numOrder={index + 1}
                      {...post}
                    />
                  ))
              : [...Array(6)].map((_, index) => (
                  <TrendingPostSkeleton key={index} numOrder={index + 1} />
                ))}
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
              {posts && posts.length
                ? posts.map((post, index) => {
                    if (index === 4 && !user) {
                      return (
                        <Fragment key={post._id}>
                          <div className="flex flex-col items-center px-6 pt-4 pb-8 xs:px-12 xs:pt-8 xs:pb-12">
                            <div className="flex flex-col">
                              <Logo />
                              <h2 className="pt-4 text-3xl font-bold">
                                <ALink href="/">Gabrielle Community</ALink> is a
                                community for everyone interested in technology.
                              </h2>
                              <p>
                                We're a place where coders share, stay
                                up-to-date and grow their careers.
                              </p>
                            </div>
                            <div className="flex w-1/2 flex-col gap-2 pt-6 xs:w-2/5 xl:w-1/4">
                              <Button
                                href="/register"
                                as="a"
                                className="rounded-md px-2 py-2 xs:px-4"
                                fluid
                              >
                                Create account
                              </Button>
                              <Button
                                href="/login"
                                as="a"
                                variant="secondary"
                                className="rounded-md px-2 py-2 xs:px-4"
                                fluid
                              >
                                Sign in
                              </Button>
                            </div>
                          </div>
                          <PostCard {...post} hasCover={index === 0} />
                        </Fragment>
                      )
                    }

                    return (
                      <PostCard
                        key={post._id}
                        {...post}
                        hasCover={index === 0}
                      />
                    )
                  })
                : [...Array(6)].map((_, index) => (
                    <PostCardSkeleton key={index} hasCover={index === 0} />
                  ))}
              {isLoadingMore && <PostCardSkeleton />}
              <div className="pt-4 text-center text-xl font-semibold" ref={ref}>
                {isReachingEnd && 'No more posts'}
              </div>
            </div>
            <div className="sticky top-20 hidden w-1/4 px-2 lg:block">
              <Heading level={2} className="pl-4 text-lg capitalize">
                Popular topics
              </Heading>
              <nav className="mt-2 pr-2">
                <ul className="flex flex-col gap-y-2 pb-4">
                  {topics
                    ? topics.map(({ _id, value, label }) => (
                        <TopicPopular key={_id} value={value} label={label} />
                      ))
                    : [...Array(10)].map((_, index) => (
                        <TopicPopularSkeleton key={index} />
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
