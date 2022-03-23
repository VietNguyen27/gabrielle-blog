import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useComments = (postId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/comments`,
    fetcher
  )
}
