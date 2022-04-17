import React, { useEffect, useRef } from 'react'
import { Notification } from '@components/Notification'
import { NotificationSkeleton } from '@components/Skeleton'
import { useLocalUser, useOnScreen } from '@hooks/index'
import { useInfiniteNotifications } from '@lib/notification'
import Empty from './Empty'

const Followers = () => {
  const localUser = useLocalUser()
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const {
    data,
    size,
    setSize,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  } = useInfiniteNotifications({
    userId: localUser._id,
    type: 'follower',
  })
  const notifications = data
    ? data.reduce((acc, val) => [...acc, ...val.notifications], [])
    : []

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  return (
    <div className="flex flex-1 flex-col items-stretch">
      {notifications.length ? (
        notifications.map((notification) => (
          <Notification key={notification._id} {...notification} />
        ))
      ) : isEmpty ? (
        <Empty />
      ) : (
        [...Array(3)].map((_, index) => <NotificationSkeleton key={index} />)
      )}
      {isLoadingMore &&
        [...Array(1)].map((_, index) => <NotificationSkeleton key={index} />)}
      <div className="h-px" ref={ref}></div>
    </div>
  )
}

export default Followers
