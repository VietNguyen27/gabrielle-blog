import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type TLayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: TLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
