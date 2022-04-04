import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useFollowing = (userId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/following`,
    fetcher
  )
}
