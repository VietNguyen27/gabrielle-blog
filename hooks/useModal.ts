import { useState } from 'react'

export const useModal = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prevState) => !prevState)

  return { open, toggle }
}
