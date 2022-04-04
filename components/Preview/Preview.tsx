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

const Preview = ({ children, className }: TPreviewProps) => {
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

const PreviewTrigger = ({ children }: TPreviewTriggerProps) => {
  return <>{children}</>
}

const PreviewCard = ({
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
        'absolute left-0 z-dropdown',
        isOverflow ? 'bottom-full pb-1' : 'top-full pt-1'
      )}
    >
      <div className="overflow-hidden rounded bg-white shadow-lg outline outline-1 outline-gray-200">
        {children}
      </div>
    </motion.div>
  )
}

export const UserPreview = ({
  user,
  children,
  className,
}: TUserPreviewProps) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false)
  const { data: { currentUser } = {} } = useCurrentUser()
  const [rect, ref] = useRect()
  const { open, toggle } = useModal()
  const isAuth = useAuth()

  useEffect(() => {
    if (rect) {
      const offsetBottom =
        (window.innerHeight || document.documentElement.clientHeight) -
        rect?.top
      const isOverflow = offsetBottom < rect.height

      setIsOverflow(isOverflow)
    }
  }, [rect])

  const handleFollow = async () => {
    if (!isAuth) {
      toggle()
      return
    }
  }

  return (
    <LoginRequired open={open} toggle={toggle}>
      <Preview className={className}>
        <PreviewTrigger>{children}</PreviewTrigger>
        <PreviewCard isOverflow={isOverflow}>
          <div className="w-[360px]" ref={ref}>
            <div
              className="h-8"
              style={{ backgroundColor: user.backdrop }}
            ></div>
            <div className="-mb-8 -translate-y-8 p-4">
              <div className="relative flex items-end gap-2 pb-6">
                <Link href={`/${user.username}`}>
                  <a>
                    <Avatar
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-12 bg-white"
                    />
                  </a>
                </Link>
                <Link href={`/${user.username}`}>
                  <a className="text-xl font-bold line-clamp-1">
                    {user.username}
                  </a>
                </Link>
              </div>
              {currentUser && currentUser.username === user.username ? (
                <Button
                  variant="secondary"
                  as="a"
                  href="/settings"
                  className="mb-4 rounded-md py-2"
                  fluid
                >
                  Edit profile
                </Button>
              ) : (
                <Button
                  variant="tertiary"
                  className="mb-4 rounded-md py-2"
                  onClick={handleFollow}
                  fluid
                >
                  Follow
                </Button>
              )}
              <div className="text-sm font-bold uppercase">Email</div>
              <div className="mb-2">{user.email}</div>
              <div className="text-sm font-bold uppercase">Work</div>
              <div className="mb-2">{user.position}</div>
              {user.location && (
                <>
                  <div className="text-sm font-bold uppercase">Location</div>
                  <div className="mb-2">{user.location}</div>
                </>
              )}
              <div className="text-sm font-bold uppercase">Joined</div>
              <div className="mb-2">{getFormattedDate(user.createdAt)}</div>
            </div>
          </div>
        </PreviewCard>
      </Preview>
    </LoginRequired>
  )
}
