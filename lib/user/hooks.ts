import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useCurrentUser = () => {
  return useSWR('/api/user', fetcher)
}

export const useUser = (id) => {
  return useSWR(`/api/users/${id}`, fetcher)
}
