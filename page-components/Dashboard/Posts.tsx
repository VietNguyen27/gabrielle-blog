import React, { useEffect, useRef } from 'react'
import { Button } from '@components/Button'
import { useInfinitePosts } from '@lib/post'
import { PostAnalysisCard } from '@components/Post/Post'
import { PostAnalysisCardSkeleton } from '@components/Skeleton'
import useOnScreen from '@hooks/useOnScreen'

const Posts = () => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfinitePosts({
      ...(localUser && { creatorId: localUser._id }),
    })
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : []

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      console.log(123)

      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  return (
    <div className="flex min-h-[50vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
      {localUser.postsCount ? (
        <div className="flex h-full w-full flex-1 flex-col">
          {posts.length
            ? posts.map((post) => <PostAnalysisCard key={post._id} {...post} />)
            : [...Array(4)].map((_, index) => (
                <PostAnalysisCardSkeleton key={index} />
              ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
          <p className="pb-4 text-lg">
            This is where you can manage your posts, but you haven&apos;t
            written anything yet.
          </p>
          <Button
            href="/write"
            as="a"
            variant="tertiary"
            className="rounded-md py-2 px-4"
          >
            Write your first post now
          </Button>
        </div>
      )}
      {isLoadingMore && <PostAnalysisCardSkeleton />}
      <div className="h-px" ref={ref}></div>
    </div>
  )
}

export default Posts
