import React from 'react'

type TLimitTextProps = {
  text: string
  limit?: number
  className?: string
}

const LimitText = ({ text, limit = 150, className }: TLimitTextProps) => {
  return <span className={className}>{text.slice(0, limit)}...</span>
}

export default LimitText
