import { UserCard } from '@components/Card'
import { UserCardSkeleton } from '@components/Skeleton'
import useOnScreen from '@hooks/useOnScreen'
import { useInfiniteFollowers } from '@lib/followers'
import React, { useEffect, useRef } from 'react'

const Followers = () => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfiniteFollowers({
      userId: localUser._id,
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
    <div className="flex min-h-[50vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
      <div className="grid h-full w-full grid-cols-3 gap-4">
        {localUser.followersCount
          ? followers.length
            ? followers.map(({ follower }) => (
                <UserCard key={follower._id} {...follower} />
              ))
            : [...Array(4)].map((_, index) => <UserCardSkeleton key={index} />)
          : null}
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
