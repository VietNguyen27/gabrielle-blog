import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container } from '@components/Layout'
import { PostCard } from '@components/Post'
import { Button } from '@components/Button'
import { PostCardSkeleton } from '@components/Skeleton'
import { LoginRequired } from '@components/LoginRequired'
import { fetcher } from '@lib/fetcher'
import { useInfinitePosts } from '@lib/post'
import { useCurrentUser } from '@lib/user'
import { useOnScreen, useModal, useAuth } from '@hooks/index'
import NoPosts from '@public/static/images/no-search.png'

const Topic = ({ topic }) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const { open, toggle } = useModal()
  const { data: { user } = {}, mutate } = useCurrentUser()
  const router = useRouter()
  const isAuth = useAuth()
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfinitePosts({
      topic: topic._id,
    })
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : []

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  const handleNavigate = () => {
    if (!isAuth) {
      toggle()
      return
    }
    router.push('/write')
  }

  const handleFollow = async () => {
    if (!isAuth) {
      toggle()
      return
    }

    await fetcher(`/api/topics/${topic.label}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: topic.label,
      }),
    })
    mutate()
  }

  const handleUnfollow = async () => {
    await fetcher(`/api/topics/${topic.label}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: topic.label,
      }),
    })
    mutate()
  }

  return (
    <LoginRequired open={open} toggle={toggle}>
      <Container>
        <div className="mx-auto flex flex-col items-stretch gap-4 py-8 md:flex-row xl:w-4/5">
          <div className="flex-shrink-0 md:w-[240px] lg:w-[300px]">
            <div className="overflow-hidden rounded-md border border-gray-200 shadow">
              <div
                className="h-5"
                style={{ backgroundColor: topic.color }}
              ></div>
              <div className="p-4">
                <h1 className="pb-2 text-2xl font-bold">{topic.label}</h1>
                <p className="pb-4">{topic.description}</p>
                {user &&
                user.interests &&
                user.interests.includes(topic.label) ? (
                  <Button
                    variant="secondary"
                    className="rounded-md px-4 py-2"
                    onClick={handleUnfollow}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="rounded-md px-4 py-2"
                    onClick={handleFollow}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-stretch">
            {!topic.postsPublished ? (
              <div className="mx-auto w-1/2 pt-4 text-center text-lg">
                <Image src={NoPosts} width={90} height={70} />
                <p>
                  This topic have no posts yet. Do you want to be the first to
                  write about this? Write it{' '}
                  <button
                    className="text-tertiary-500 hover:text-tertiary-900"
                    onClick={handleNavigate}
                  >
                    right now
                  </button>
                </p>
              </div>
            ) : posts && posts.length && topic.postsPublished ? (
              <>
                {posts.map((post) => (
                  <PostCard key={post._id} {...post} />
                ))}
                <div
                  className="pt-4 text-center text-xl font-semibold"
                  ref={ref}
                >
                  {isReachingEnd && 'No more posts'}
                </div>
              </>
            ) : (
              [...Array(6)].map((_, index) => <PostCardSkeleton key={index} />)
            )}
          </div>
        </div>
      </Container>
    </LoginRequired>
  )
}

export default Topic
