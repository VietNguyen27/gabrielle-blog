import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useTopics = (limit: null | number = null) => {
  return useSWR(limit ? `/api/topics?limit=${limit}` : '/api/topics', fetcher)
}
