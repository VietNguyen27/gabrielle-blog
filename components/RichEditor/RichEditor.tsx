import React, { useRef } from 'react'
import Toolbar from './Toolbar'
import ContentBox from './ContentBox'

const RichEditor = () => {
  const contentRef = useRef(null)

  return (
    <div className="relative">
      <Toolbar ref={contentRef} />
      <ContentBox ref={contentRef} />
    </div>
  )
}

export default RichEditor
