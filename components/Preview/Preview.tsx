import React, {
  ReactChild,
  ReactChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { getFormattedDate } from '@utils/utils'
import { useCurrentUser } from '@lib/user'
import { TUser } from '@global/types'
import useRect from '@hooks/useRect'
import { useModal } from '@hooks/useModal'
import { useAuth } from '@hooks/useAuth'
import { LoginRequired } from '@components/LoginRequired'
import { motion } from 'framer-motion'
import { useFollowers } from '@lib/followers'
import { fetcher } from '@lib/fetcher'

type TPreviewProps = {
  children: [ReactElement, ReactElement]
  className?: string
}

type TPreviewTriggerProps = {
  children: ReactChild | ReactChildren
}

type TPreviewCardProps = {
  children: ReactChild | ReactChildren
  isOverflow: boolean
  isHovered?: boolean
}

type TUserPreviewProps = {
  user: TUser
  children: ReactChild | ReactChildren
  className?: string
}

export const Preview = ({ children, className }: TPreviewProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [delayHandler, setDelayHandler] = useState<any>(null)

  const handleMouseEnter = () => {
    setDelayHandler(
      setTimeout(() => {
        setIsHovered && setIsHovered(true)
      }, 400)
    )
  }

  const handleMouseLeave = () => {
    clearTimeout(delayHandler)
    setIsHovered && setIsHovered(false)
  }

  return (
    <div
      className={clsx('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children[0], { setIsHovered })}
      {React.cloneElement(children[1], { isHovered })}
    </div>
  )
}

export const PreviewTrigger = ({ children }: TPreviewTriggerProps) => {
  return <>{children}</>
}

export const PreviewCard = ({
  children,
  isOverflow,
  isHovered,
}: TPreviewCardProps) => {
  return (
    <motion.div
      initial="false"
      animate={{
        opacity: isHovered ? 1 : 0,
        display: isHovered ? 'block' : 'none',
      }}
      transition={{ duration: 0.25 }}
      className={clsx(
        'absolute left-0 z-dropdown hidden',
        isOverflow ? 'bottom-full pb-1' : 'top-full pt-1'
      )}
    >
      <div className="overflow-hidden rounded bg-white shadow-lg outline outline-1 outline-gray-200">
        {children}
      </div>
    </motion.div>
  )
}
