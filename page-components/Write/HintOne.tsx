import React from 'react'
import { Emphasize } from '@components/Emphasize'

const HintOne = () => {
  return (
    <>
      <h4 className="mb-3 text-lg font-bold">Writing a Great Post Title</h4>
      <ul className="list-disc pl-6 text-gray-800">
        <li className="mb-1 last:mb-0">
          Think of your post title as a <Emphasize>super short</Emphasize> (but
          compelling!) description — like an overview of the actual post in one
          short sentence.
        </li>
        <li className="mb-1 last:mb-0">
          Use <Emphasize>keywords</Emphasize> where appropriate to help ensure
          people can find your post by search.
        </li>
      </ul>
    </>
  )
}

export default HintOne
