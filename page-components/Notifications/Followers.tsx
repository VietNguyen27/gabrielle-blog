import React from 'react'
import { useLocalUser } from '@hooks/index'
import { useInfiniteNotifications } from '@lib/notification'

const Followers = () => {
  const localUser = useLocalUser()
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfiniteNotifications({
      userId: localUser._id,
      type: 'follower',
    })
  const notifications = data
    ? data.reduce((acc, val) => [...acc, ...val.notifications], [])
    : []

  return <div></div>
}

export default Followers
