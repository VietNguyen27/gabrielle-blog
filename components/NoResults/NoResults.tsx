import React from 'react'
import NoSearch from '@public/static/images/no-search.png'
import Image from 'next/image'
import clsx from 'clsx'

type TNoResultsProps = {
  className?: string
}

const NoResults = ({ className }: TNoResultsProps) => {
  const defaultClassName =
    'flex h-full w-full flex-1 flex-col items-center justify-center text-center'
  const allClassNames = clsx(defaultClassName, className)

  return (
    <div className={allClassNames}>
      <Image src={NoSearch} width={90} height={70} alt="no results found" />
      <p className="pb-2 text-xl font-bold">No results found</p>
      <p className="text-lg">
        We couldn&apos;t find what you&apos;re looking for
      </p>
    </div>
  )
}

export default NoResults
