import React, { useRef } from 'react'
import { usePosts } from '@lib/post'
import { Container } from '@components/Layout'
import { Post } from '@components/Post'
import { Button } from '@components/Button'
import NoPosts from '@public/static/images/no-search.png'
import Link from 'next/link'
import Image from 'next/image'

const Topic = ({ topic }) => {
  const ref = useRef(null)
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    usePosts({
      topic: topic._id,
    })
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : []

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
          {posts && posts.map((post) => <Post key={post._id} {...post} />)}
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
                <Link href="/write">
                  <a className="text-tertiary-500">right now</a>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Topic
