import React from 'react'
import { Container } from '@components/Layout'
import { Heading } from '@components/Heading'
import { TopicCard } from '@components/Topic'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { SearchIcon } from '@heroicons/react/outline'
import { TopicCardSkeleton } from '@components/Skeleton'
import { useTopics } from '@lib/topic'

const Topics = () => {
  const { data: { topics } = {} } = useTopics()

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between">
          <Heading className="text-2xl">Top Topics</Heading>
          <Form onSubmit={() => null}>
            <Input
              name="search"
              label="Search for tag"
              rounded="xs"
              className="w-[150px] pr-4 sm:w-[200px]"
              suffix={
                <SearchIcon className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2" />
              }
            />
          </Form>
        </div>
        <div className="-mx-3 flex flex-wrap items-stretch">
          {topics
            ? topics.map((topic) => <TopicCard key={topic._id} {...topic} />)
            : [...Array(20)].map((_, index) => (
                <TopicCardSkeleton key={index} />
              ))}
        </div>
      </div>
    </Container>
  )
}

export default Topics
