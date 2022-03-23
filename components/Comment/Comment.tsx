import { Button } from '@components/Button'
import { Dropdown, Menu, MenuItem } from '@components/Dropdown'
import { ImageRatio } from '@components/ImageRatio'
import {
  ChatAlt2Icon,
  DotsHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import { encodeHtml, getFormattedDate } from '@utils/utils'
import DOMPurify from 'dompurify'
import Link from 'next/link'
import React from 'react'

type TCreator = {
  username: string
  profilePicture: string
}

type TCommentProps = {
  content: string
  creator: TCreator
  likesCount: number
  createdAt: Date
}

const Comment = ({
  content,
  creator,
  likesCount,
  createdAt,
}: TCommentProps) => {
  return (
    <div className="mb-4 flex items-start gap-3">
      <ImageRatio
        src={creator.profilePicture}
        className="mt-3 w-8 flex-shrink-0 rounded-full border border-gray-200"
      />
      <div className="flex flex-col">
        <div className="mb-2 rounded-md border border-gray-200 p-4">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center">
              <Link href={`/${creator.username}`}>
                <a className="font-bold">{creator.username}</a>
              </Link>
              <span className="mx-2 h-1 w-1 rounded-full bg-gray-700"></span>
              <span className="text-gray-700">
                {getFormattedDate(createdAt)}
              </span>
            </div>
            <Dropdown
              className="inline-flex"
              overlay={
                <Menu className="w-[250px]" position="right-0 top-full">
                  <MenuItem>Report Abuse</MenuItem>
                </Menu>
              }
            >
              <button>
                <DotsHorizontalIcon className="relative -top-2 -right-2 h-5 w-5" />
              </button>
            </Dropdown>
          </div>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(encodeHtml(content)),
            }}
          ></div>
        </div>
        <div className="flex items-center">
          <Button variant="quinary" className="rounded-md px-2 py-1.5">
            <HeartIcon className="mr-1 h-5 w-5" />
            {likesCount} likes
          </Button>
          <Button variant="quinary" className="rounded-md px-2 py-1.5">
            <ChatAlt2Icon className="mr-1 h-5 w-5" />
            Reply
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Comment
