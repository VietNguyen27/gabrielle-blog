import React, { useEffect, useState } from 'react'
import { Select2 } from '@components/Select2'
import { useTopics } from '@lib/topic'

const Topic = ({ setValue }) => {
  const [topicsSelected, setTopicsSelected] = useState([])
  const { data: { topics } = {} } = useTopics()

  useEffect(() => {
    setValue('topic', topicsSelected || '')
  }, [topicsSelected])

  return (
    <Select2
      title="Top topics"
      options={topics}
      placeholder="Select topics..."
      selectedOptions={topicsSelected}
      maxHeight={270}
      onChange={setTopicsSelected}
      maxOptions={4}
      multiple
    />
  )
}

export default Topic
