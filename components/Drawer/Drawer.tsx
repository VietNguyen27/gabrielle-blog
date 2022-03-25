import React, { ReactNode, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { MenuAlt2Icon } from '@heroicons/react/outline'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { Logo } from '@components/Logo'

type TDrawerProps = {
  open: boolean
  className?: string
  children: ReactNode
  onClose: () => void
}

const Drawer = ({ open, onClose, className, children }: TDrawerProps) => {
  const drawerRef = useRef(null)
  const defaultClassName =
    'relative z-elevate flex flex-col h-screen items-stretch overflow-y-auto bg-white shadow-lg'
  const allClassNames = clsx(defaultClassName, className)

  useOnClickOutside(drawerRef, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
          }}
          className="fixed top-0 left-0 z-popover h-screen w-screen"
        >
          <div className="absolute top-0 left-0 h-full w-full bg-slate-800/10"></div>
          <motion.aside
            initial={{ translateX: '-100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '-100%' }}
            transition={{
              duration: 0.25,
            }}
            className={allClassNames}
            ref={drawerRef}
          >
            <div className="flex items-center gap-4 px-3 py-4">
              <button onClick={onClose}>
                <MenuAlt2Icon className="h-5 w-5" />
              </button>
              <Logo />
            </div>
            <div className="flex flex-col items-stretch">{children}</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Drawer
