import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useTopics = (limit: null | number = null) => {
  if (limit) {
    return useSWR(`/api/topics?limit=${limit}`, fetcher)
  }
  return useSWR('/api/topics', fetcher)
}
