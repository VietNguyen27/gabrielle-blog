import React, { forwardRef } from 'react'
import { Textarea } from '@components/Textarea'

const ContentBox = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div>
      <Textarea
        ref={ref}
        className="min-h-[250px] text-lg"
        placeholder="Write your post content here..."
      />
    </div>
  )
})

export default ContentBox
