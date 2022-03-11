export const fetcher = (url, opts) => {
  return fetch(url, opts).then(async (res) => {
    let payload
    try {
      if (res.status === 204) return null
      payload = await res.json()
    } catch (error) {
      return Promise.reject(error || new Error('Something went wrong'))
    }
    if (res.ok) {
      return payload
    } else {
      return Promise.reject(payload || new Error('Something went wrong'))
    }
  })
}
