import React, { useEffect, useState } from 'react'
import { Container } from '@components/Layout'
import { Title } from '@components/Title'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { BookmarkIcon, SearchIcon } from '@heroicons/react/outline'
import { useUserBookmarks } from '@lib/bookmark'
import { PostCardSecondary } from '@components/Card'
import { PostCardSecondarySkeleton } from '@components/Skeleton'
import { saveUserToLocalStorage, useCurrentUser } from '@lib/user'
import { useDebounce } from '@hooks/useDebounce'
import { Select } from '@components/Select'
import { NoResults } from '@components/NoResults'
import { TTopic } from '@global/types'
import clsx from 'clsx'

const Bookmarks = () => {
  const [filteredBookmarks, setFilteredBookmarks] = useState([])
  const [tempBookmarks, setTempBookmarks] = useState([])
  const [allTopics, setAllTopics] = useState([])
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data: { user } = {} } = useCurrentUser()
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null
  const { data: { bookmarks } = {} } = useUserBookmarks()
  const defaultOption = { label: 'All topics', value: 'all' }

  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 300)

  useEffect(() => {
    if (bookmarks) {
      const allTopics = bookmarks
        .map(({ topics }) => topics)
        .flat(Infinity)
        .map(({ label, value }) => ({ label, value }))
      const uniqueTopics = allTopics.filter(
        (item, index, arr) =>
          index === arr.findIndex((topic) => topic.value === item.value)
      )

      setFilteredBookmarks(bookmarks)
      setTempBookmarks(bookmarks)
      setAllTopics(uniqueTopics)
    }
  }, [bookmarks])

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchedBookmarks = (tempBookmarks as any).filter(({ title }) =>
        title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      setFilteredBookmarks(searchedBookmarks)
    } else {
      setFilteredBookmarks(tempBookmarks)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user)
    }
  }, [user])

  const handleFilterBookmarks = (topic) => {
    const filteredBookmarks =
      topic === 'all'
        ? bookmarks
        : bookmarks.filter(({ topics }) =>
            topics.some((t) => t.value === topic)
          )

    setFilter(topic)
    setTempBookmarks(filteredBookmarks)
    setFilteredBookmarks(filteredBookmarks)
    setSearchTerm('')
  }

  return (
    <Container>
      <div className="py-8">
        <div className="flex flex-col items-stretch justify-between pb-4 md:flex-row md:items-center">
          <Title className="mb-4 md:mb-0">
            Bookmarks ({localUser.bookmarksCount})
          </Title>
          <Form onSubmit={() => null}>
            <Input
              name="search"
              label="Search"
              rounded="xs"
              className="mb-4 pr-4 md:mb-0 md:w-[200px]"
              suffix={
                <SearchIcon className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2" />
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          <div className="block md:hidden">
            <Select
              options={[defaultOption, ...allTopics]}
              defaultValue={defaultOption}
              onChange={handleFilterBookmarks}
            />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-4 md:flex-row">
          <div className="hidden min-w-[200px] flex-shrink-0 md:block lg:min-w-[240px]">
            <ul className="mb-4 flex max-h-[450px] flex-col gap-y-2 overflow-auto">
              <li
                className={clsx(
                  'text-md flex cursor-pointer whitespace-nowrap rounded px-2 py-1.5',
                  filter === 'all'
                    ? 'bg-indigo-100 font-bold'
                    : 'text-gray-500 hover:bg-indigo-50 hover:text-gray-800'
                )}
                onClick={() => handleFilterBookmarks('all')}
              >
                All topics
              </li>
              {allTopics.map(({ value, label }: TTopic) => (
                <li
                  key={value}
                  className={clsx(
                    'text-md flex cursor-pointer whitespace-nowrap rounded px-2 py-1.5',
                    filter === value
                      ? 'bg-indigo-100 font-bold'
                      : 'text-gray-500 hover:bg-indigo-50 hover:text-gray-800'
                  )}
                  onClick={() => handleFilterBookmarks(value)}
                >
                  #{label.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex min-h-[50vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-3 shadow xs:p-6">
            {!localUser.bookmarksCount ? (
              <div className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
                <p className="pb-2 text-lg font-bold">
                  Your reading list is empty
                </p>
                <p className="flex flex-wrap items-center justify-center gap-1">
                  Click the <span className="font-bold">bookmark reaction</span>
                  <BookmarkIcon className="h-6 w-6" />
                  when viewing a post to add it to your reading list.
                </p>
              </div>
            ) : bookmarks && localUser.bookmarksCount ? (
              <div className="flex flex-col items-stretch gap-6">
                {filteredBookmarks &&
                  filteredBookmarks.map((bookmark: any) => (
                    <PostCardSecondary key={bookmark._id} {...bookmark} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-stretch gap-6">
                {[...Array(3)].map((_, index) => (
                  <PostCardSecondarySkeleton key={index} />
                ))}
              </div>
            )}
            {bookmarks &&
            localUser.bookmarksCount &&
            !filteredBookmarks.length ? (
              <NoResults className="-mt-8" />
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Bookmarks
