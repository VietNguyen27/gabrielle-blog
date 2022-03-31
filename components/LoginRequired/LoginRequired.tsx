import React, { ReactChild, ReactChildren } from 'react'
import { LoginRequiredModal } from '@components/Modal'

type TLogicRequired = {
  open: boolean
  toggle: () => void
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
}

const LoginRequired = ({ open, toggle, children }: TLogicRequired) => {
  return (
    <>
      {children}
      <LoginRequiredModal open={open} toggle={toggle} />
    </>
  )
}

export default LoginRequired
