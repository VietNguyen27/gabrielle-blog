import React, { ReactNode } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'

type TTitleQuestionProps = {
  counter: number
  title: string | ReactNode
  description?: string
  required?: boolean
}

const TitleQuestion = ({
  counter,
  title,
  description,
  required = true,
}: TTitleQuestionProps) => {
  return (
    <div className="relative pb-4">
      <h2 className="relative inline-block pb-1 text-2xl">
        <span className="static top-1/2 right-full mr-2 -mb-4 flex -translate-y-1/2 items-center text-2xl text-gray-600 md:absolute md:-mb-0 md:inline-flex md:text-sm">
          {counter} <ArrowSmRightIcon className="h-6 w-6 md:h-4 md:w-4" />
        </span>
        {title}
        {required && <span className="ml-1.5 font-bold text-red-600">*</span>}
      </h2>
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  )
}

export default TitleQuestion
