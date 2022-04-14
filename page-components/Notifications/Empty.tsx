import React from 'react'

const Empty = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
      <p className="pb-2 text-xl font-bold">Your notifications is empty</p>
      <p className="text-lg">
        Interact with everyone like posting something, commenting, etc. to
        receive some notifications
      </p>
    </div>
  )
}

export default Empty
