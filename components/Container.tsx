import React, { ReactChild, ReactChildren } from 'react'

type TContainerProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
}

const Container = ({ children }: TContainerProps) => {
  return <div className="container mx-auto px-4">{children}</div>
}

export default Container
