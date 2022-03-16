import React, { useEffect, useRef } from 'react'
import { RichEditor } from '@components/RichEditor'

const TextEditor = ({ setValue }) => {
  const content = useRef<any>(null)

  useEffect(() => {
    setValue('content', content.current || '')
  }, [content.current])

  return <RichEditor content={content} />
}

export default TextEditor
