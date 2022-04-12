import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { Container } from '@components/Layout'
import { Title } from '@components/Title'
import { TopicCard } from '@components/Topic'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { NoResults } from '@components/NoResults'
import { TopicCardSkeleton } from '@components/Skeleton'
import { useTopics } from '@lib/topic'
import { useDebounce } from '@hooks/index'
import { TTopic } from '@global/types'

const Topics = () => {
  const [filteredTopics, setFilteredTopics] = useState([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data: { topics } = {} } = useTopics()

  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 300)

  useEffect(() => {
    if (topics) {
      setFilteredTopics(topics)
    }
  }, [topics])

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchedTopics = topics.filter(({ label }) =>
        label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      setFilteredTopics(searchedTopics)
    } else {
      setFilteredTopics(topics)
    }
  }, [debouncedSearchTerm])

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between pb-2">
          <Title>Top Topics</Title>
          <Form onSubmit={() => null}>
            <Input
              name="search"
              label="Search"
              rounded="xs"
              className="mb-0 w-[150px] pr-4 sm:w-[200px]"
              suffix={
                <SearchIcon className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2" />
              }
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </div>
        <div className="-mx-1 flex flex-wrap items-stretch sm:-mx-3">
          {topics
            ? filteredTopics &&
              filteredTopics.map((topic: TTopic) => (
                <TopicCard key={topic._id} {...topic} />
              ))
            : [...Array(20)].map((_, index) => (
                <TopicCardSkeleton key={index} />
              ))}
          {topics && filteredTopics && !filteredTopics.length && (
            <NoResults className="mt-8" />
          )}
        </div>
      </div>
    </Container>
  )
}

export default Topics
