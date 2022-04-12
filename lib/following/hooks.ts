import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@lib/fetcher'

const USERS_PER_PAGE = 9

export const useFollowing = (userId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/following`,
    fetcher
  )
}

export const useInfiniteFollowing = ({
  userId = '',
  username = '',
  limit = USERS_PER_PAGE,
} = {}) => {
  const { data, error, size, isValidating, ...props } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.following.length) return null

      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit + '')
      searchParams.set('skip', pageIndex * limit + '')

      if (username) searchParams.set('username_like', username)

      return `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/user/${userId}/following?${searchParams.toString()}`
    },
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty =
    data?.reduce((acc, val) => [...acc, ...val.following], []).length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.following?.length < limit)
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
