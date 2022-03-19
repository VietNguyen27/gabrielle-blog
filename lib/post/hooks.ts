import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@lib/fetcher'

const POSTS_PER_PAGE = 8

export const usePosts = ({ creatorId = '', limit = POSTS_PER_PAGE } = {}) => {
  const { data, error, size, isValidating, ...props } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.posts.length) return null

      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit + '')
      searchParams.set('skip', pageIndex * POSTS_PER_PAGE + '')

      if (creatorId) searchParams.set('by', creatorId)

      return `/api/posts?${searchParams.toString()}`
    },
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts?.length < limit)
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
