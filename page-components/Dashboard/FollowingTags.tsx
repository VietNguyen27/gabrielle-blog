import React from 'react'

const FollowingTags = () => {
  return (
    <div className="flex min-h-[40vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-4 shadow">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
        <p className="text-lg">You don&apos;t have any following tags yet...</p>
      </div>
    </div>
  )
}

export default FollowingTags
