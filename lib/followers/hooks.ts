import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useFollowers = (userId = '') => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/followers`,
    fetcher
  )
}
