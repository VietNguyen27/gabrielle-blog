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
