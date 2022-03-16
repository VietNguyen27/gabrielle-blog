import React, { useEffect, useState } from 'react'
import { Select } from '@components/Select'
import { topics } from '@page-components/Auth/data'

const Topic = ({ setValue }) => {
  const [topic, setTopic] = useState([])

  useEffect(() => {
    setValue('topic', topic || '')
  }, [topic])

  return (
    <Select
      title="Top topics"
      options={topics}
      placeholder="Select topics..."
      selectedOptions={topic}
      maxHeight={270}
      onChange={setTopic}
      maxOptions={4}
      multiple
    />
  )
}

export default Topic
