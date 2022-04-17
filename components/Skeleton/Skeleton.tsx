import clsx from 'clsx'
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

export const PostCardPrimarySkeleton = () => {
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

export const PostCardSecondarySkeleton = () => {
  return (
    <div className="flex gap-4">
      <div className="h-8 w-8 flex-shrink-0 animate-pulse rounded-full bg-gray-200"></div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

export const PostCardTertiarySkeleton = () => {
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

export const PostCardSkeleton = ({ hasCover = false, hasHeader = true }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-md border border-gray-200 shadow-sm">
      {hasCover && (
        <div className="h-0 animate-pulse bg-gray-200 pb-[40%]"></div>
      )}
      <div className="p-4">
        {hasHeader && (
          <div className="flex items-center pb-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
            <div className="flex flex-col pl-2">
              <div className="mb-1 h-4 w-28 animate-pulse rounded bg-gray-200"></div>
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        )}
        <div
          className={clsx(
            'flex flex-col items-stretch',
            hasHeader && 'xs:pl-10'
          )}
        >
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

export const PostAnalysisCardSkeleton = () => {
  return (
    <div className="relative mb-4 border-b border-gray-200 pb-4">
      <div className="flex items-center">
        <div className="flex w-full flex-col pr-4">
          <div className="mb-2 h-5 w-4/5 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-2 h-4 w-64 animate-pulse rounded bg-gray-200"></div>
          <div className="flex flex-wrap items-center">
            <div className="mr-4 h-5 w-9 animate-pulse rounded bg-gray-200"></div>
            <div className="mr-4 h-5 w-9 animate-pulse rounded bg-gray-200"></div>
            <div className="mr-4 h-5 w-9 animate-pulse rounded bg-gray-200"></div>
            <div className="mr-4 h-5 w-9 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="ml-auto h-8 w-16 flex-shrink-0 animate-pulse rounded-md bg-gray-200 px-2 py-1.5"></div>
      </div>
    </div>
  )
}

export const CommentSkeleton = () => {
  return (
    <div className="mb-4 flex items-start">
      <div className="mt-3 mr-2 h-8 w-8 flex-shrink-0 animate-pulse rounded-full bg-gray-200"></div>
      <div className="flex flex-1 flex-col items-stretch">
        <div className="mb-3 rounded-md border border-gray-200 p-4">
          <div className="relative flex items-center justify-between pb-4">
            <div className="flex flex-col xs:flex-row xs:items-center">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="mx-2 hidden h-1 w-1 animate-pulse rounded-full bg-gray-700 xs:inline-block"></div>
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="absolute -top-2 -right-2 h-5 w-5 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-8 w-24 animate-pulse rounded-md bg-gray-200 px-2 py-1.5"></div>
          <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200 px-2 py-1.5"></div>
        </div>
      </div>
    </div>
  )
}

export const UserCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-8 shadow">
      <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200"></div>
      <div className="mt-3 mb-3 h-5 w-24 animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
    </div>
  )
}

export const NotificationSkeleton = () => {
  const randomNotification = Math.floor(Math.random() * 2)

  return (
    <div className="relative mb-4 border-b border-gray-200 pb-4">
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="mr-4 h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
          <div className="flex flex-1 flex-col pr-8">
            <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200"></div>
            {randomNotification ? (
              <div className="mt-2">
                <PostCardSkeleton hasHeader={false} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
