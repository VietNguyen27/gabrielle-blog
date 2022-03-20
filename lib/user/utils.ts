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

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserToLocalStorage = () => {
  localStorage.removeItem('user')
}
