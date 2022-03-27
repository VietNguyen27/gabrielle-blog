import React, { useEffect } from 'react'
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
import { Button } from '@components/Button'
import { ImageRatio } from '@components/ImageRatio'
import { CardTertiary } from '@components/Card'
import { useCurrentUser } from '@lib/user'
import { TopicAnchor } from '@components/Topic'
import { ALink } from '@components/ALink'
import CommentList from './CommentList'
import { usePost, usePosts, useRandomPosts } from '@lib/post'
import { useLikes } from '@lib/like'
import { CardPrimary } from '@components/Card/Card'
import { CardPrimarySkeleton, CardTertiarySkeleton } from '@components/Skeleton'
import { Avatar } from '@components/Avatar'
import { fetcher } from '@lib/fetcher'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { useBookmarks } from '@lib/bookmark'

const MoreOptionsDropdown = () => {
  return (
    <Menu className="w-[250px]" position="right-1/4 sm:left-0 top-full">
      <MenuItem>
        <span className="font-bold">Copy Link</span>
        <DuplicateIcon className="h-6 w-6" />
      </MenuItem>
      <MenuItem>Report Abuse</MenuItem>
    </Menu>
  )
}

const PostDetail = ({
  _id,
  title,
  topics,
  content,
  cover,
  creator,
  creatorId,
  readingTime,
  likesCount,
  bookmarksCount,
  commentsCount,
  createdAt,
}) => {
  const { data: { user } = {} } = useCurrentUser()
  const { data: { posts } = {} } = useRandomPosts({ not: _id })
  const { data: { posts: morePostsFromThisUser } = {} } = usePosts({
    creatorId,
    not: _id,
    limit: 3,
  })
  const { data: { posts: morePostsFromCommunity } = {} } = usePosts({
    not: _id,
    limit: 3,
  })
  const { data: { post } = {}, mutate } = usePost(_id)
  const { data: { likes } = {}, mutate: likesMutate } = useLikes(_id)
  const { data: { bookmarks } = {}, mutate: bookmarksMutate } =
    useBookmarks(_id)
  const router = useRouter()
  const isLiked = user && likes && likes.includes(user._id)
  const isBookmarked = user && bookmarks && bookmarks.includes(user._id)

  useEffect(() => {
    mutate()
  }, [router.asPath])

  const checkLoggedIn = () => {
    if (!user) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
      mutate()
      return false
    }
    return true
  }

  const handleLikePost = async () => {
    if (checkLoggedIn()) {
      try {
        await fetcher(`/api/posts/${_id}/likes`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId: _id,
          }),
        })
        mutate()
        likesMutate()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnlikePost = async () => {
    try {
      await fetcher(`/api/posts/${_id}/likes`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: _id,
        }),
      })
      mutate()
      likesMutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSavePost = async () => {
    if (checkLoggedIn()) {
      try {
        await fetcher(`/api/posts/${_id}/bookmarks`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId: _id,
          }),
        })
        mutate()
        bookmarksMutate()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnsavePost = async () => {
    try {
      await fetcher(`/api/posts/${_id}/bookmarks`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: _id,
        }),
      })
      mutate()
      bookmarksMutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="post-details bg-gray-300/10 py-4">
      <Container>
        <div className="flex flex-col items-stretch pb-8 sm:flex-row">
          <div className="relative pb-4 sm:z-elevate sm:w-16 sm:pr-4 ">
            <div className="static top-24 mt-8 flex flex-row items-center justify-center gap-4 rounded-md border border-gray-300 bg-white py-2 sm:sticky sm:flex-col sm:border-transparent sm:bg-transparent sm:py-0">
              <button
                className="group inline-flex flex-1 flex-row items-center justify-center sm:flex-auto sm:flex-col"
                onClick={isLiked ? handleUnlikePost : handleLikePost}
              >
                <span
                  className={clsx(
                    'inline-block rounded-full p-2 transition-all group-hover:bg-red-100 group-hover:text-red-700',
                    isLiked && 'bg-red-50 text-red-700'
                  )}
                >
                  {isLiked ? (
                    <HeartIcon className="h-6 w-6 fill-red-700" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </span>
                <span>{post ? post.likesCount : likesCount}</span>
              </button>
              <button
                className="group inline-flex flex-1 flex-row items-center justify-center sm:flex-auto sm:flex-col"
                onClick={isBookmarked ? handleUnsavePost : handleSavePost}
              >
                <span
                  className={clsx(
                    'inline-block rounded-full p-2 transition-all group-hover:bg-indigo-100 group-hover:text-indigo-700',
                    isBookmarked && 'bg-indigo-50 text-indigo-700'
                  )}
                >
                  {isBookmarked ? (
                    <BookmarkIcon className="h-6 w-6 fill-indigo-700" />
                  ) : (
                    <BookmarkIcon className="h-6 w-6" />
                  )}
                </span>
                <span>{post ? post.bookmarksCount : bookmarksCount}</span>
              </button>
              <Dropdown
                className="inline-flex flex-1 justify-center sm:flex-auto"
                overlay={MoreOptionsDropdown()}
              >
                <button>
                  <DotsHorizontalIcon className="h-6 w-6" />
                </button>
              </Dropdown>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch gap-y-4 lg:flex-row">
            <div className="flex w-full flex-col items-stretch gap-4 lg:w-2/3">
              <div className="rounded-md border border-gray-300 bg-white shadow">
                {cover && (
                  <ImageRatio
                    src={cover}
                    className="w-full"
                    alt="Post thumbnail"
                    ratio={2.5}
                  />
                )}
                <div className="px-6 py-6 sm:px-12">
                  <div className="flex items-center gap-4 pb-6">
                    <Avatar
                      src={creator.profilePicture}
                      alt={creator.username}
                      className="w-10"
                    />
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">
                        {creator.username}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span>Posted on {getFormattedDate(createdAt)}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                        <span>{readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                  <h1 className="mb-2 text-5xl font-bold leading-tight">
                    {title}
                  </h1>
                  <div className="flex gap-1">
                    {topics.map((topic) => (
                      <TopicAnchor key={topic.value} {...topic} />
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
                <CommentList postId={_id} commentsCount={commentsCount} />
              </div>
              <div className="rounded-md border border-gray-300 bg-white shadow">
                <div className="px-6 py-6 sm:px-12">
                  <h2 className="pb-4 text-2xl font-bold">Read next</h2>
                  <div className="flex flex-col items-stretch gap-6">
                    {posts
                      ? posts.map((post) => (
                          <CardPrimary key={post._id} {...post} />
                        ))
                      : [...Array(4)].map((_, index) => (
                          <CardPrimarySkeleton key={index} />
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full px-0 lg:w-1/3 lg:px-4">
              <div className="static top-24 flex flex-col items-stretch gap-4 lg:sticky">
                <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow">
                  <div
                    className="h-8"
                    style={{ backgroundColor: creator.backdrop }}
                  ></div>
                  <div className="-mb-8 -translate-y-8 p-4">
                    <div className="relative flex items-end gap-2 pb-6">
                      <Link href={`/${creator.username}`}>
                        <a>
                          <Avatar
                            src={creator.profilePicture}
                            alt={creator.username}
                            className="w-12 bg-white"
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
                        variant="secondary"
                        as="a"
                        href="/settings"
                        className="mb-4 rounded-md py-2"
                        fluid
                      >
                        Edit profile
                      </Button>
                    ) : (
                      <Button
                        variant="tertiary"
                        className="mb-4 rounded-md py-2"
                        fluid
                      >
                        Follow
                      </Button>
                    )}
                    {creator.bio && <div className="mb-4">{creator.bio}</div>}
                    <div className="text-sm font-bold uppercase">Email</div>
                    <div className="mb-2">{creator.email}</div>
                    <div className="text-sm font-bold uppercase">Work</div>
                    <div className="mb-2">{creator.position}</div>
                    {creator.location && (
                      <>
                        <div className="text-sm font-bold uppercase">
                          Location
                        </div>
                        <div className="mb-2">{creator.location}</div>
                      </>
                    )}
                    <div className="text-sm font-bold uppercase">Joined</div>
                    <div>{getFormattedDate(creator.createdAt)}</div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow">
                  <header className="p-4">
                    <h2 className="text-xl font-bold">
                      {morePostsFromThisUser ? (
                        morePostsFromThisUser.length ? (
                          <>
                            More from{' '}
                            <ALink href={`/${creator.username}`}>
                              {creator.username}
                            </ALink>
                          </>
                        ) : (
                          <>
                            Trending on{' '}
                            <ALink href="/">Gabrielle Community</ALink>
                          </>
                        )
                      ) : (
                        <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200"></div>
                      )}
                    </h2>
                  </header>
                  <div className="flex flex-col items-stretch">
                    {morePostsFromThisUser
                      ? morePostsFromThisUser.length
                        ? morePostsFromThisUser.map((post) => (
                            <CardTertiary key={post._id} {...post} />
                          ))
                        : morePostsFromCommunity &&
                          morePostsFromCommunity.map((post) => (
                            <CardTertiary key={post._id} {...post} />
                          ))
                      : [...Array(3)].map((_, index) => (
                          <CardTertiarySkeleton key={index} />
                        ))}
                  </div>
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
