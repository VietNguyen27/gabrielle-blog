import React, { useEffect } from 'react'
import { Container } from '@components/Layout'
import { Title } from '@components/Title'
import { Form } from '@components/Form'
import { Input } from '@components/Input'
import { BookmarkIcon, SearchIcon } from '@heroicons/react/outline'
import { useUserBookmarks } from '@lib/bookmark'
import { CardSecondary } from '@components/Card/Card'
import { CardSecondarySkeleton } from '@components/Skeleton'
import { saveUserToLocalStorage, useCurrentUser } from '@lib/user'

const Bookmarks = () => {
  const { data: { user } = {} } = useCurrentUser()
  const localUser = JSON.parse(localStorage.getItem('user') as any) || null
  const { data: { bookmarks } = {} } = useUserBookmarks()

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user)
    }
  }, [user])

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between pb-4">
          <Title>Bookmarks ({localUser.bookmarksCount})</Title>
          <Form onSubmit={() => null}>
            <Input
              name="search"
              label="Search..."
              rounded="xs"
              className="mb-0 w-[150px] pr-4 sm:w-[200px]"
              suffix={
                <SearchIcon className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2" />
              }
            />
          </Form>
        </div>
        <div className="flex flex-col items-stretch gap-4 md:flex-row">
          <div className="min-w-[200px] flex-shrink-0 lg:min-w-[240px]">
            <div className="text-xl font-bold">All tags</div>
          </div>
          <div className="flex min-h-[40vh] flex-1 flex-col items-stretch overflow-hidden rounded-md border border-gray-200 p-6 shadow">
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
                {bookmarks.map((bookmark) => (
                  <CardSecondary key={bookmark._id} {...bookmark} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-stretch gap-6">
                {[...Array(3)].map((_, index) => (
                  <CardSecondarySkeleton key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Bookmarks
