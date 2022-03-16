import React from 'react'
import {
  BookmarkIcon,
  DotsHorizontalIcon,
  DuplicateIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { Container } from '@components/Layout'
import { Dropdown, Menu, MenuItem } from '@components/Dropdown'
import Link from 'next/link'
import DOMPurify from 'dompurify'
import { getFormattedDate, parseMarkdown } from '@utils/utils'
import { Button, EButtonAs, EButtonVariants } from '@components/Button'
import { ImageRatio } from '@components/ImageRatio'
import { CardSecondary } from '@components/Card'
import { useCurrentUser } from '@lib/user'

const MoreOptionsDropdown = () => {
  return (
    <Menu className="w-[250px]" position="left-0">
      <MenuItem>
        <span className="font-bold">Copy Link</span>
        <DuplicateIcon className="h-6 w-6" />
      </MenuItem>
      <MenuItem>Report Abuse</MenuItem>
    </Menu>
  )
}

const PostDetail = ({
  title,
  topic,
  content,
  cover,
  creator,
  likesCount,
  bookmarksCount,
  createdAt,
  morePostsFromThisUser,
  morePostsFromCommunity,
}) => {
  const { data: { user } = {} } = useCurrentUser()

  return (
    <div className="bg-gray-300/20 py-4">
      <Container>
        <div className="flex items-stretch pb-8">
          <div className="relative w-16 pr-4">
            <div className="sticky top-24 flex flex-col items-center justify-center gap-4 pt-8">
              <button className="group inline-flex flex-col items-center">
                <span className="inline-block rounded-full p-2 transition-colors group-hover:bg-red-100 group-hover:text-red-700">
                  <HeartIcon className="h-6 w-6" />
                </span>
                <span>{likesCount}</span>
              </button>
              <button className="group inline-flex flex-col items-center">
                <span className="inline-block rounded-full p-2 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-700">
                  <BookmarkIcon className="h-6 w-6" />
                </span>
                <span>{bookmarksCount}</span>
              </button>
              <Dropdown overlay={MoreOptionsDropdown()}>
                <button>
                  <DotsHorizontalIcon className="h-6 w-6" />
                </button>
              </Dropdown>
            </div>
          </div>
          <div className="w-2/3">
            <div className="rounded-md border border-gray-300 bg-white shadow">
              {cover && (
                <ImageRatio
                  src={cover}
                  className="w-full"
                  alt="Post thumbnail"
                  ratio={2.5}
                />
              )}
              <div className="px-12 py-6">
                <div className="flex items-center gap-4 pb-6">
                  <ImageRatio
                    className="w-10 rounded-full"
                    src={creator.profilePicture}
                  />
                  <div className="flex flex-col">
                    <div className="text-lg font-bold">{creator.username}</div>
                    <div className="text-sm">
                      Posted on {getFormattedDate(createdAt)}
                    </div>
                  </div>
                </div>
                <h1 className="mb-2 text-5xl font-bold leading-tight">
                  {title}
                </h1>
                <div>
                  {topic.map((topic, index) => (
                    <Link
                      key={index}
                      href={`/topic/${topic.label.toLowerCase()}`}
                    >
                      <a className="rounded-md border border-transparent px-1.5 py-1 text-gray-600 outline-none transition-colors duration-200 hover:border-gray-300 hover:bg-gray-100">
                        #{topic.label.toLowerCase()}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 text-lg">
                  <div
                    className="markdown-container"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(parseMarkdown(content)),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-1/3 px-4">
            <div className="sticky top-24 flex flex-col items-stretch gap-4">
              <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow">
                <div
                  className="h-8"
                  style={{ backgroundColor: creator.backdrop }}
                ></div>
                <div className="-mb-8 -translate-y-8 p-4">
                  <div className="relative flex items-end gap-2 pb-6">
                    <Link href={`/${creator.username}`}>
                      <a>
                        <ImageRatio
                          src={creator.profilePicture}
                          className="w-12 rounded-full bg-white"
                          alt="Post thumbnail"
                        />
                      </a>
                    </Link>
                    <Link href={`/${creator.username}`}>
                      <a className="text-xl font-bold line-clamp-1">
                        {creator.username}
                      </a>
                    </Link>
                  </div>
                  {user && user.username === creator.username ? (
                    <Button
                      variant={EButtonVariants.SECONDARY}
                      buttonAs={EButtonAs.LINK}
                      href="/settings"
                      className="rounded-md py-2"
                      fluid
                    >
                      Edit profile
                    </Button>
                  ) : (
                    <Button
                      variant={EButtonVariants.TERTIARY}
                      className="rounded-md py-2"
                      fluid
                    >
                      Follow
                    </Button>
                  )}

                  <div className="py-4">{creator.position}</div>
                  <div className="text-sm font-bold uppercase">Joined</div>
                  <div>{getFormattedDate(creator.createdAt)}</div>
                </div>
              </div>
              <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow">
                <header className="p-4">
                  {morePostsFromThisUser && (
                    <h2 className="text-xl font-bold">
                      More from{' '}
                      <Link href={`/${creator.username}`}>
                        <a className="text-tertiary-500">{creator.username}</a>
                      </Link>
                    </h2>
                  )}
                  {morePostsFromCommunity && (
                    <h2 className="text-xl font-bold">
                      Trending on{' '}
                      <Link href="/">
                        <a className="text-tertiary-500">Gabrielle Community</a>
                      </Link>
                    </h2>
                  )}
                </header>
                <div className="flex flex-col items-stretch">
                  {morePostsFromThisUser &&
                    morePostsFromThisUser.map((post) => (
                      <CardSecondary {...post} />
                    ))}
                  {morePostsFromCommunity &&
                    morePostsFromCommunity.map((post) => (
                      <CardSecondary {...post} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PostDetail
