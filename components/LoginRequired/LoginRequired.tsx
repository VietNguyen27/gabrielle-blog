import React, { ReactChild, ReactChildren } from 'react'
import { LoginRequiredModal } from '@components/Modal'

type TLogicRequired = {
  open: boolean
  toggle: () => void
  path?: string
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
}

const LoginRequired = ({ open, toggle, path, children }: TLogicRequired) => {
  return (
    <>
      {children}
      <LoginRequiredModal open={open} toggle={toggle} path={path} />
    </>
  )
}

export default LoginRequired
