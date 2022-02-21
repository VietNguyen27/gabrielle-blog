import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/static/images/logo.png'

const Logo = () => {
  return (
    <Link href="/">
      <a className="cursor-pointer">
        <Image alt="Gabrielle logo" src={logo} width={120} height={20} />
      </a>
    </Link>
  )
}

export default Logo
