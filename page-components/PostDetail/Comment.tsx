import React, { useRef, useState } from 'react'
import { useCurrentUser } from '@lib/user'
import { Textarea } from '@components/Textarea'
import { ImageRatio } from '@components/ImageRatio'
import clsx from 'clsx'
import { Button } from '@components/Button'

const Comment = () => {
  const [focus, setFocus] = useState(false)
  const ref = useRef(null)
  const { data: { user } = {} } = useCurrentUser()

  return (
    <div className="border-t border-gray-200 px-6 py-8 sm:px-12">
      <div className="flex flex-col items-stretch">
        <h2 className="pb-4 text-2xl font-bold">Discussion (0)</h2>
        <div className="flex items-start gap-3">
          {user && (
            <ImageRatio
              src={user.profilePicture}
              className="w-8 flex-shrink-0 rounded-full border border-gray-200"
            />
          )}
          <Textarea
            variant="secondary"
            className={clsx(
              'flex-grow',
              focus ? 'min-h-[120px]' : 'min-h-[50px]'
            )}
            ref={ref}
            onFocus={() => setFocus(true)}
          />
        </div>
        {focus && (
          <div
            className={clsx('flex items-center gap-2 pt-3', user && 'pl-11')}
          >
            <Button variant="tertiary" className="rounded-md px-4 py-2">
              Submit
            </Button>
            <Button
              variant="secondary"
              className="rounded-md px-4 py-2"
              onClick={() => setFocus(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
