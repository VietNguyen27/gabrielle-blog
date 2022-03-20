import React from 'react'

export const TopicCardSkeleton = () => {
  return (
    <div className="w-1/2 px-1 py-1 sm:px-3 sm:py-2.5 md:w-1/3">
      <div className="flex h-full flex-col items-stretch overflow-hidden rounded-md border border-gray-200 shadow">
        <div className="h-5 bg-gray-300"></div>
        <div className="p-3 sm:p-5">
          <div className="h-[30px] w-20 animate-pulse rounded-md bg-gray-200"></div>
          <div className="mt-3 mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-3 mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-4 h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
          <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

export const TopicPopularSkeleton = () => {
  return <li className="mb-1 h-9 animate-pulse rounded bg-gray-200"></li>
}

export const CardPrimarySkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 flex-shrink-0 animate-pulse rounded-full bg-gray-200"></div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

export const CardSecondarySkeleton = () => {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="h-4 animate-pulse rounded bg-gray-200"></div>
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
      <div className="flex items-center gap-x-2 gap-y-1">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  )
}

export const PostCardSkeleton = ({ hasCover = false }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-md border border-gray-200 shadow-sm">
      {hasCover && (
        <div className="h-0 animate-pulse bg-gray-200 pb-[40%]"></div>
      )}
      <div className="p-4">
        <div className="flex items-center pb-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
          <div className="flex flex-col pl-2">
            <div className="mb-1 h-4 w-28 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col items-stretch xs:pl-10">
          <div className="mb-2 h-6 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-2 h-6 w-1/2 animate-pulse rounded bg-gray-200"></div>
          <div className="flex flex-wrap gap-1 pb-2">
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex flex-col items-start justify-between gap-y-2 xs:flex-row xs:items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-28 animate-pulse rounded-md bg-gray-200 lg:w-32"></div>
              <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200 lg:w-36"></div>
            </div>
            <div className="flex items-center gap-2 self-end">
              <div className="h-4 w-16 animate-pulse rounded-sm bg-gray-200"></div>
              <div className="h-6 w-6 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TrendingPostSkeleton = ({ numOrder }) => {
  return (
    <div className="flex items-stretch gap-4">
      <div className="-mt-2 w-9 flex-shrink-0 whitespace-nowrap text-3xl font-bold text-gray-200">
        {numOrder >= 10 ? numOrder : '0' + numOrder}
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-2 flex items-center gap-2">
          <div className="relative h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
          <div className="relative h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="relative mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
        <div className="relative mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
        <div className="flex items-center gap-2 text-sm">
          <div className="relative h-3 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="inline-block h-1 w-1 rounded-full bg-gray-700"></div>
          <div className="relative h-3 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
