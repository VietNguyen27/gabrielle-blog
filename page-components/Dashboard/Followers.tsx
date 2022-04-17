import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { UserCard } from '@components/Card'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { UserCardSkeleton } from '@components/Skeleton'
import { useLocalUser, useOnScreen, useDebounce } from '@hooks/index'
import { useInfiniteFollowers } from '@lib/followers'

const Followers = () => {
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
  } = useInfiniteFollowers({
    userId: localUser._id,
    ...(debouncedSearchTerm && { username: debouncedSearchTerm }),
  })
  const followers = data
    ? data.reduce((acc, val) => [...acc, ...val.followers], [])
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
            name="followers search"
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
      <div className="grid h-full w-full grid-cols-2 gap-4 lg:grid-cols-3">
        {localUser.followersCount ? (
          followers.length ? (
            followers.map(({ follower }) => (
              <UserCard key={follower._id} {...follower} />
            ))
          ) : isEmpty ? (
            <div className="absolute top-0 left-0 h-full w-full">
              <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
                <p className="px-4 pb-4 text-lg">
                  Sorry, we couldn&apos;t find any results for your search.
                </p>
              </div>
            </div>
          ) : (
            [...Array(2)].map((_, index) => <UserCardSkeleton key={index} />)
          )
        ) : null}
        {isLoadingMore &&
          [...Array(3)].map((_, index) => <UserCardSkeleton key={index} />)}
        <div className="h-px" ref={ref}></div>
      </div>
      {!localUser.followersCount ? (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
          <p className="text-lg">You don&apos;t have any followers yet...</p>
        </div>
      ) : null}
    </div>
  )
}

export default Followers
