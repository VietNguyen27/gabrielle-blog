import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useTopics = (limit: null | number = null) => {
  return useSWR(
    limit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/topics?limit=${limit}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/topics`,
    fetcher
  )
}
