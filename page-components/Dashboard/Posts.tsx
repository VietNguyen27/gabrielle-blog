import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { Button } from '@components/Button'
import { PostAnalysisCard } from '@components/Post/Post'
import { PostAnalysisCardSkeleton } from '@components/Skeleton'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { useDebounce, useOnScreen, useLocalUser } from '@hooks/index'
import { useInfinitePosts } from '@lib/post'

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const localUser = useLocalUser()
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 300)
  const {
    data,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  } = useInfinitePosts({
    creatorId: localUser._id,
    ...(debouncedSearchTerm && { title: debouncedSearchTerm }),
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
    <div className="relative flex min-h-[25vh] flex-1 flex-col items-stretch rounded-md border border-gray-200 p-4 shadow xs:min-h-[50vh]">
      <div className="absolute bottom-full left-0 flex w-full items-center justify-end pb-3">
        <Form onSubmit={() => null}>
          <Input
            name="posts search"
            label="Search"
            rounded="sm"
            className="mb-0 w-[150px] pr-4 sm:w-[200px]"
            suffix={
              <SearchIcon className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2" />
            }
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
      </div>
      {localUser.postsCount ? (
        <div className="flex h-full w-full flex-1 flex-col">
          {posts.length ? (
            posts.map((post) => <PostAnalysisCard key={post._id} {...post} />)
          ) : isEmpty ? (
            <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
              <p className="px-4 pb-4 text-lg">
                Sorry, we couldn&apos;t find any results for your search.
              </p>
            </div>
          ) : (
            [...Array(2)].map((_, index) => (
              <PostAnalysisCardSkeleton key={index} />
            ))
          )}
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
