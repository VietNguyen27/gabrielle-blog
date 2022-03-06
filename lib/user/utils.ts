import slug from 'slug'

export const extractUser = (req) => {
  if (!req.user) return null
  const { password, status, reportReceived, ...rest } = req.user

  return {
    ...rest,
  }
}

export const slugUsername = (username) => slug(username, '_')
