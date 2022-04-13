import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useBookmarks = (postId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/bookmarks`,
    fetcher
  )
}

export const useUserBookmarks = () => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/bookmarks`,
    fetcher
  )
}

export const useBookmarksByUserId = (userId = '', after: string = '') => {
  return useSWR(() => {
    const searchParams = new URLSearchParams()

    if (after) searchParams.set('after', after)

    return `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/user/${userId}/bookmarks?${searchParams.toString()}`
  }, fetcher)
}
