import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@lib/fetcher'

const USERS_PER_PAGE = 9

export const useFollowers = (userId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/followers`,
    fetcher
  )
}

export const useFollowersByUserId = (userId = '', after: string = '') => {
  return useSWR(() => {
    const searchParams = new URLSearchParams()

    if (after) searchParams.set('after', after)

    return `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/user/${userId}/followers?${searchParams.toString()}`
  }, fetcher)
}

export const useInfiniteFollowers = ({
  userId = '',
  username = '',
  limit = USERS_PER_PAGE,
} = {}) => {
  const { data, error, size, isValidating, ...props } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.followers.length) return null

      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit + '')
      searchParams.set('skip', pageIndex * limit + '')

      if (username) searchParams.set('username_like', username)

      return `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/user/${userId}/followers?${searchParams.toString()}`
    },
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty =
    data?.reduce((acc, val) => [...acc, ...val.followers], []).length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.followers?.length < limit)
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
