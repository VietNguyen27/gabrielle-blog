import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@public/static/images/logo.png'

type TLogoProps = {
  width?: number
  height?: number
}

const Logo = ({ width = 120, height = 20 }: TLogoProps) => {
  return (
    <Link href="/">
      <a className="cursor-pointer leading-none">
        <Image alt="Gabrielle logo" src={logo} width={width} height={height} />
      </a>
    </Link>
  )
}

export default Logo
