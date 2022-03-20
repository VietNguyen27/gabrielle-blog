import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@lib/fetcher'

const POSTS_PER_PAGE = 8
const MAX_RANDOM_POSTS = 4

export const useInfinitePosts = ({
  creatorId = '',
  topic = '',
  limit = POSTS_PER_PAGE,
} = {}) => {
  const { data, error, size, isValidating, ...props } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.posts.length) return null

      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit + '')
      searchParams.set('skip', pageIndex * POSTS_PER_PAGE + '')

      if (creatorId) searchParams.set('by', creatorId)
      if (topic) searchParams.set('topic', topic)

      return `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/posts?${searchParams.toString()}`
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

export const usePosts = ({
  creatorId = '',
  not = '',
  limit = MAX_RANDOM_POSTS,
} = {}) => {
  return useSWR(
    () => {
      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit + '')

      if (creatorId) searchParams.set('by', creatorId)
      if (not) searchParams.set('not', not)

      return `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/posts?${searchParams.toString()}`
    },
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  )
}

export const useRandomPosts = ({ not = '', limit = MAX_RANDOM_POSTS } = {}) => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?not=${not}&limit=${limit}&random=true`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  )
}
