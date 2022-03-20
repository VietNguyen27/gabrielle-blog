import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const RouteGuard = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    authCheck(router.asPath)
    const hideContent = () => setAuthorized(false)

    router.events.on('routeChangeStart', hideContent)
    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const authCheck = (url) => {
    const privatePaths = ['/write', '/bookmarks', '/settings', '/notifications']
    const path = url.split('?')[0]
    const user = JSON.parse(localStorage.getItem('user') as any) || null

    if (!user && privatePaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: path },
      })
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}

export default RouteGuard
