import React, { useEffect, useRef } from 'react'
import { Textarea } from '@components/Textarea'

const Title = ({ setValue }) => {
  const title = useRef<any>(null)

  useEffect(() => {
    setValue('title', title.current || '')
  }, [title.current])

  return (
    <div className="my-4">
      <Textarea
        className="font-roboto text-4xl font-bold"
        placeholder="New post title here"
        contentRef={title}
      />
    </div>
  )
}

export default Title
