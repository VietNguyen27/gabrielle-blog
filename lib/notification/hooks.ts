import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@lib/fetcher'

const NOTIFICATION_PER_REQUEST = 9

export const useInfiniteNotifications = ({
  userId = '',
  type = '',
  limit = NOTIFICATION_PER_REQUEST,
} = {}) => {
  const { data, error, size, isValidating, ...props } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.notifications.length)
        return null

      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit + '')
      searchParams.set('skip', pageIndex * limit + '')

      if (type) searchParams.set('type', type)

      return `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/user/${userId}/notifications?${searchParams.toString()}`
    },
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty =
    data?.reduce((acc, val) => [...acc, ...val.notifications], []).length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.notifications?.length < limit)
  const isRefreshing = isValidating && data && data.length === size

  return {
    data,
    error,
    size,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    ...props,
  }
}
