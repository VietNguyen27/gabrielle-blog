import React, { useEffect, useRef } from 'react'
import { useInfinitePosts } from '@lib/post'
import { Container } from '@components/Layout'
import { PostCard } from '@components/Post'
import { Button } from '@components/Button'
import NoPosts from '@public/static/images/no-search.png'
import Image from 'next/image'
import useOnScreen from '@hooks/useOnScreen'
import { PostCardSkeleton } from '@components/Skeleton'
import { ALink } from '@components/ALink'

const Topic = ({ topic }) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
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

  return (
    <Container>
      <div className="mx-auto flex flex-col items-stretch gap-4 py-8 md:flex-row xl:w-4/5">
        <div className="flex-shrink-0 md:w-[240px] lg:w-[300px]">
          <div className="overflow-hidden rounded-md border border-gray-200 shadow">
            <div className="h-5" style={{ backgroundColor: topic.color }}></div>
            <div className="p-4">
              <h1 className="pb-2 text-2xl font-bold">{topic.label}</h1>
              <p className="pb-4">{topic.description}</p>
              <Button className="rounded-md px-4 py-2">Follow</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-stretch">
          {posts && posts.length
            ? posts.map((post) => <PostCard key={post._id} {...post} />)
            : [...Array(6)].map((_, index) => <PostCardSkeleton key={index} />)}
          {posts && posts.length ? (
            <div className="pt-4 text-center text-xl font-semibold" ref={ref}>
              {isReachingEnd && 'No more posts'}
            </div>
          ) : (
            <div className="mx-auto w-1/2 pt-4 text-center text-lg">
              <Image src={NoPosts} width={90} height={70} />
              <p>
                This topic have no posts yet. Do you want to be the first to
                write about this? Write it{' '}
                <ALink href="/write">right now</ALink>
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Topic
