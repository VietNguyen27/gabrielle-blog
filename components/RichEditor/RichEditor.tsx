import React, { useRef } from 'react'
import Toolbar from './Toolbar'
import ContentBox from './ContentBox'

type TRichEditorProps = {
  content: any
}

const RichEditor = ({ content }: TRichEditorProps) => {
  const textareaRef = useRef(null)

  return (
    <div className="relative">
      <Toolbar ref={textareaRef} content={content} />
      <ContentBox ref={textareaRef} content={content} />
    </div>
  )
}

export default RichEditor
