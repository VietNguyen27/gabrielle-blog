import React from 'react'
import { Emphasize } from '@components/Emphasize'

const HintTwo = () => {
  return (
    <>
      <h4 className="mb-3 text-lg font-bold">Tagging Guidelines</h4>
      <ul className="list-disc pl-6 text-gray-800">
        <li className="mb-1 last:mb-0">Tags help people find your post.</li>
        <li className="mb-1 last:mb-0">
          Think of tags as the <Emphasize>topics</Emphasize> or{' '}
          <Emphasize>categories</Emphasize> that best describe your post.
        </li>
        <li className="mb-1 last:mb-0">
          Add <Emphasize>one</Emphasize> comma-separated tags per post.
        </li>
        <li className="mb-1 last:mb-0">
          Use <Emphasize>existing tags</Emphasize> whenever possible.
        </li>
        <li className="mb-1 last:mb-0">
          Some tags, such as “help” or “healthydebate”, have special posting
          guidelines.
        </li>
      </ul>
    </>
  )
}

export default HintTwo
