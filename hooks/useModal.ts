import { useState } from 'react'

const useModal = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prevState) => !prevState)

  return { open, toggle }
}

export default useModal
