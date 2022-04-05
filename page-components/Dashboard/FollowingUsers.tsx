import React, { useEffect, useRef, useState } from 'react'
import { UserCard } from '@components/Card'
import { UserCardSkeleton } from '@components/Skeleton'
import useOnScreen from '@hooks/useOnScreen'
import { useInfiniteFollowing } from '@lib/following'
import useLocalUser from '@hooks/useLocalUser'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { SearchIcon } from '@heroicons/react/solid'

const FollowingUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const localUser = useLocalUser()
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfiniteFollowing({
      userId: localUser._id,
    })
  const following = data
    ? data.reduce((acc, val) => [...acc, ...val.following], [])
    : []

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  return (
    <div className="relative flex flex-1 flex-col items-stretch rounded-md border border-gray-200 p-4 shadow xs:min-h-[50vh]">
      <div className="absolute bottom-full left-0 flex w-full items-center justify-end pb-3">
        <Form onSubmit={() => null}>
          <Input
            name="search"
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
        {localUser.followingCount
          ? following.length
            ? following.map(({ following }) => (
                <UserCard key={following._id} {...following} />
              ))
            : [...Array(4)].map((_, index) => <UserCardSkeleton key={index} />)
          : null}
        {isLoadingMore &&
          [...Array(3)].map((_, index) => <UserCardSkeleton key={index} />)}
        <div className="h-px" ref={ref}></div>
      </div>
      {!localUser.followingCount ? (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
          <p className="text-lg">
            You don&apos;t have any following users yet...
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default FollowingUsers
