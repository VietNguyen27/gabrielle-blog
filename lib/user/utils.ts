import slug from 'slug'

export const extractUser = (user) => {
  if (!user) return null
  const { password, status, reportReceived, createdAt, updatedAt, ...rest } =
    user

  return {
    ...rest,
    createdAt: createdAt.getTime(),
    updatedAt: updatedAt.getTime(),
  }
}

export const slugUsername = (username) => slug(username, '-')
