import { useState, useCallback } from 'react'

const useToggle = (initialState = false) => {
  const [open, setOpen] = useState(initialState)

  const toggle = useCallback(() => setOpen((prevState) => !prevState), [])

  return { open, toggle }
}

export default useToggle
