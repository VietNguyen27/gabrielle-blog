import { fetcher } from '@lib/fetcher'
import useSWR from 'swr'

export const useCurrentUser = () => {
  return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, fetcher)
}

export const useUser = (id) => {
  return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, fetcher)
}
