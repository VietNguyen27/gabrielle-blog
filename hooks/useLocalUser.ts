import React from 'react'

const useLocalUser = () => {
  return JSON.parse(localStorage.getItem('user') as any) || null
}

export default useLocalUser
