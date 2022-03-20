import React, { forwardRef } from 'react'
import { Textarea } from '@components/Textarea'

type TContentBoxProps = {
  content: any
}

const ContentBox = forwardRef<HTMLDivElement, TContentBoxProps>(
  ({ content }, ref) => {
    return (
      <div>
        <Textarea
          ref={ref}
          className="min-h-[250px] text-lg"
          placeholder="Write your post content here..."
          contentRef={content}
        />
      </div>
    )
  }
)
ContentBox.displayName = 'ContentBox'

export default ContentBox
