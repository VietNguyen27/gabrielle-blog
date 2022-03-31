import { useCurrentUser } from '@lib/user'

export const useAuth = (): boolean => {
  const { data: { user } = {} } = useCurrentUser()

  if (!user) {
    return false
  }

  return true
}
