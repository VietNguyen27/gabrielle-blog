import { Button } from '@components/Button'
import { XIcon } from '@heroicons/react/solid'
import useOnClickOutside from '@hooks/useOnClickOutside'
import React, { ReactChild, ReactChildren, useRef } from 'react'
import ReactDOM from 'react-dom'

type TModalProps = {
  open: boolean
  toggle: () => void
  title: string
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[]
}

const Modal = ({ open, toggle, title, children }: TModalProps) => {
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, toggle)

  return open
    ? ReactDOM.createPortal(
        <div className="fixed top-0 left-0 z-modal flex h-screen w-screen items-center justify-center bg-neutral-900/30">
          <div className="w-full max-w-[480px] px-4">
            <div
              className="overflow-hidden rounded-xl bg-white shadow"
              ref={modalRef}
            >
              <div className="flex items-center justify-between border-b border-gray-200 py-2 pl-6 pr-2">
                <h2 className="text-xl font-bold leading-10">{title}</h2>
                <Button
                  variant="quaternary"
                  className="rounded-md p-2"
                  onClick={toggle}
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col items-stretch p-6">{children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}

export default Modal
