import { useMessage } from '@lib/store'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const Message = () => {
  const {
    message: { message, type },
    resetMessage,
  } = useMessage()
  const primaryColor =
    type === 'success' ? 'var(--success-900)' : 'var(--error-900)'
  const secondaryColor =
    type === 'success' ? 'var(--success-100)' : 'var(--error-100)'

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
          }}
          className="fixed z-popover flex h-screen w-screen items-center justify-center bg-neutral-900/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            className="w-[320px] px-4 sm:w-[360px]"
          >
            <div
              className="relative flex flex-col items-center overflow-hidden rounded-md bg-white py-10 px-4 shadow-lg"
              style={{
                ['--message-900' as any]: primaryColor,
                ['--message-100' as any]: secondaryColor,
              }}
            >
              <div className="absolute top-0 left-0 w-3/4 -translate-x-1/3 -translate-y-1/3 rounded-full bg-message-100 pb-[75%]"></div>
              <div className="absolute bottom-0 right-0 w-1/3 translate-x-1/2 translate-y-1/2 rounded-full bg-message-100 pb-[33.33%]"></div>
              <div className="relative mx-auto mb-16 mt-12 w-1/2 pb-[50%]">
                <div className="absolute top-0 left-0 h-full w-full rounded-full border-[10px] border-message-900">
                  {type === 'success' ? (
                    <>
                      <div className="absolute top-1/2 left-1/2 h-[10px] w-2/5 -translate-x-[25%] -translate-y-1/2 -rotate-[40deg] rounded-tr-lg rounded-bl-lg rounded-br-lg bg-message-900"></div>
                      <div className="absolute top-1/2 left-1/2 h-[10px] w-1/4 -translate-x-[90%] -translate-y-[30%] rotate-[48deg] rounded-tl-lg rounded-bl-lg rounded-br bg-message-900"></div>
                    </>
                  ) : (
                    <>
                      <div className="absolute top-1/2 left-1/2 h-[10px] w-2/5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-lg bg-message-900"></div>
                      <div className="absolute top-1/2 left-1/2 h-[10px] w-2/5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-lg bg-message-900"></div>
                    </>
                  )}
                </div>
                <div className="absolute bottom-[110%] right-[110%]">
                  <div className="absolute h-8 w-8 -translate-x-1/2 rounded-full bg-message-900"></div>
                  <div className="absolute bottom-full h-4  w-4 translate-x-full rounded-full bg-message-900"></div>
                </div>
                <div className="absolute bottom-[110%] left-[110%]">
                  <div className="absolute h-4 w-4 translate-y-full -translate-x-1/2 rounded-full bg-message-900"></div>
                  <div className="absolute h-2 w-2 -translate-x-[150%] rounded-full bg-message-900"></div>
                </div>
                <div className="absolute top-[110%] left-[110%]">
                  <div className="absolute h-7 w-7 -translate-y-[110%] -translate-x-[110%] rounded-full bg-message-900"></div>
                  <div className="absolute h-2 w-2 -translate-x-1/2 -translate-y-[500%] rounded-full bg-message-900"></div>
                </div>
                <div className="absolute top-[110%] right-[110%]">
                  <div className="absolute h-6 w-6 -translate-y-1/2 rounded-full bg-message-900"></div>
                  <div className="absolute h-2 w-2 translate-x-[400%] -translate-y-[200%] rounded-full bg-message-900"></div>
                  <div className="absolute h-4 w-4 translate-x-[200%] rounded-full bg-message-900"></div>
                </div>
              </div>
              <div className="text-3xl font-bold text-message-900">
                {type === 'success' ? 'Success' : 'Whoops'}
              </div>
              <p className="px-4 pt-4 pb-8 text-center">{message}</p>
              <button
                className="rounded-full border border-transparent bg-message-900 px-8 py-2 text-lg text-white transition-all duration-200 hover:border-message-900 hover:bg-message-100 hover:text-message-900"
                onClick={resetMessage}
              >
                {type === 'success' ? 'Continue' : 'Try Again'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Message
