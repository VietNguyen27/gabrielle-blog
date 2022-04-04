import React, { useEffect, useRef } from 'react'
import { UserCard } from '@components/Card'
import { UserCardSkeleton } from '@components/Skeleton'
import useOnScreen from '@hooks/useOnScreen'
import { useInfiniteFollowing } from '@lib/following'

const FollowingUsers = () => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null
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
    <div className="flex min-h-[50vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
      <div className="grid h-full w-full grid-cols-3 gap-4">
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
