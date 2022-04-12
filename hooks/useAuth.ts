import { useCurrentUser } from '@lib/user'

const useAuth = (): boolean => {
  const { data: { user } = {} } = useCurrentUser()

  if (!user) {
    return false
  }

  return true
}

export default useAuth
