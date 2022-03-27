import React, { useEffect, useRef } from 'react'
import { Button } from '@components/Button'
import { Container } from '@components/Layout'
import {
  CakeIcon,
  DocumentTextIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  LocationMarkerIcon,
  MailIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { getFormattedDate } from '@utils/utils'
import { useCurrentUser } from '@lib/user'
import { Dropdown, Menu, MenuItem } from '@components/Dropdown'
import { ImageRatio } from '@components/ImageRatio'
import { PostCard } from '@components/Post'
import useOnScreen from '@hooks/useOnScreen'
import { useInfinitePosts } from '@lib/post'
import { PostCardSkeleton } from '@components/Skeleton'

const Profile = ({
  _id,
  username,
  email,
  backdrop,
  bio,
  postsCount,
  followersCount,
  followingCount,
  interests,
  position,
  profilePicture,
  location,
  skills,
  createdAt,
}) => {
  const { data: { user } = {} } = useCurrentUser()
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const { data, size, setSize, isLoadingMore, isReachingEnd, isRefreshing } =
    useInfinitePosts({
      creatorId: _id,
    })
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : []

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  return (
    <>
      <div className="h-32" style={{ backgroundColor: backdrop }}></div>
      <Container>
        <div className="lg:px-24">
          <div className="flex -translate-y-12 flex-col items-stretch">
            <div className="mb-4 flex flex-col items-stretch rounded-md border border-gray-200 bg-white shadow-sm">
              <div className="relative p-6">
                <ImageRatio
                  className="absolute left-6 top-0 w-[60px] -translate-y-1/2 rounded-full bg-white outline outline-4 md:left-1/2 md:w-[120px] md:-translate-x-1/2 md:outline-8"
                  style={{ outlineColor: backdrop }}
                  src={profilePicture}
                  alt={`${username} profile picture`}
                />
                <div className="flex justify-end gap-2">
                  {user && user.username === username ? (
                    <Button
                      href="/settings"
                      as="a"
                      variant="tertiary"
                      className="rounded-md px-4 py-2"
                    >
                      Edit profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="tertiary"
                        className="rounded-md px-4 py-2"
                      >
                        Follow
                      </Button>
                      <Dropdown
                        overlay={
                          <Menu className="w-[250px]">
                            <MenuItem>Block @{username}</MenuItem>
                            <MenuItem>Report Abuse</MenuItem>
                          </Menu>
                        }
                      >
                        <Button variant="quaternary" className="rounded-md p-2">
                          <DotsHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </Dropdown>
                    </>
                  )}
                </div>
                <div className="mx-auto pt-4 pb-4 text-center md:w-4/5 md:pt-10">
                  <h1 className="text-4xl font-bold">{username}</h1>
                  <p className="pt-2 text-xl">
                    {bio ? bio : '404 bio not found'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 pb-2 text-gray-600 md:gap-x-5">
                  <span className="inline-flex items-center gap-1.5">
                    <CakeIcon className="h-6 w-6" />
                    Join on {getFormattedDate(createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MailIcon className="h-6 w-6" />
                    {email}
                  </span>
                  {location && (
                    <span className="inline-flex items-center gap-1.5">
                      <LocationMarkerIcon className="h-6 w-6" />
                      {location}
                    </span>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-100">
                <div className="mx-auto w-3/4 px-6 py-3 text-center">
                  <p className="font-bold text-gray-600">Work</p>
                  <p>{position}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-4 md:flex-row">
              <div className="flex w-full flex-col items-stretch gap-4 md:w-1/3">
                {skills && (
                  <div className="rounded border border-gray-200 p-4">
                    <h2 className="pb-6 text-lg font-bold">Skills/language</h2>
                    <p>{skills}</p>
                  </div>
                )}
                <div className="rounded border border-gray-200 p-4">
                  <ul>
                    <li className="flex items-center gap-2 pb-3 last:pb-0">
                      <DocumentTextIcon className="h-6 w-6 text-gray-600" />
                      {postsCount} posts published
                    </li>
                    <li className="flex items-center gap-2 pb-3 last:pb-0">
                      <UserIcon className="h-6 w-6 text-gray-600" />
                      {followingCount} following
                    </li>
                    <li className="flex items-center gap-2 pb-3 last:pb-0">
                      <UserIcon className="h-6 w-6 text-gray-600" />
                      {followersCount} followers
                    </li>
                    <li className="flex items-center gap-2 pb-3 last:pb-0">
                      <HashtagIcon className="h-6 w-6 text-gray-600" />
                      {interests.length} topics followed
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full flex-col items-stretch md:w-2/3">
                {posts && posts.length
                  ? posts.map((post) => <PostCard key={post._id} {...post} />)
                  : [...Array(6)].map((_, index) => (
                      <PostCardSkeleton key={index} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile
