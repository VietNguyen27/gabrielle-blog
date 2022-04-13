import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useLikes = (postId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/likes`,
    fetcher
  )
}

export const useLikesByUserId = (userId = '', after: string = '') => {
  return useSWR(() => {
    const searchParams = new URLSearchParams()

    if (after) searchParams.set('after', after)

    return `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/user/${userId}/likes?${searchParams.toString()}`
  }, fetcher)
}
